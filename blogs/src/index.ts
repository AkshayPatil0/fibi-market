import mongoose from "mongoose";

import { nats } from "@fibimarket/common";

import { app } from "./app";

import AWS from "aws-sdk";

import env from "dotenv";
import { AdminCreatedListener } from "./events/listeners/admin-created-listener";
import { AdminUpdatedListener } from "./events/listeners/admin-updated-listener";
import { AdminDeletedListener } from "./events/listeners/admin-deleted-listener";
env.config();

const run = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be provided !");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be provided !");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("MONGO_URI must be provided !");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("MONGO_URI must be provided !");
  }
  if (!process.env.NATS_URL) {
    throw new Error("MONGO_URI must be provided !");
  }
  try {
    await nats.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    console.log("connected to NATS !!");

    nats.client.on("close", () => {
      console.log("closing NATS connection !");
      process.exit();
    });
    process.on("SIGINT", () => nats.client.close());
    process.on("SIGTERM", () => nats.client.close());

    new AdminCreatedListener(nats.client).listen();
    new AdminUpdatedListener(nats.client).listen();
    new AdminDeletedListener(nats.client).listen();
  } catch (err) {
    console.error(err);
    process.exit();
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongoDB !!");
  } catch (err) {
    console.error(err);
    process.exit();
  }

  if (!process.env.AWS_ID) {
    throw new Error("AWS_ID must be provided !");
  }
  if (!process.env.AWS_SECRET) {
    throw new Error("AWS_SECRET must be provided !");
  }
  if (!process.env.AWS_BUCKET_NAME) {
    throw new Error("AWS_BUCKET_NAME must be provided !");
  }

  AWS.config.update({
    credentials: {
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_SECRET,
    },
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log(`listening on ${process.env.PORT || 4000} !!`);
  });
};

run();
