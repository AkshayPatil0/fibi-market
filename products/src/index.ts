import mongoose from "mongoose";

import { nats } from "@fibimarket/common";

import { app } from "./app";
import AWS, { S3 } from "aws-sdk";
import env from "dotenv";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { VendorCreatedListener } from "./events/listeners/vendor-created-listener";
import { VendorDeletedListener } from "./events/listeners/vendor-deleted-listener";
import { VendorUpdatedListener } from "./events/listeners/vendor-updated-listner";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
env.config();

const run = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be provided !");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be provided !");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be provided !");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be provided !");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be provided !");
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

    new OrderCreatedListener(nats.client).listen();
    new OrderCancelledListener(nats.client).listen();
    new VendorCreatedListener(nats.client).listen();
    new VendorDeletedListener(nats.client).listen();
    new VendorUpdatedListener(nats.client).listen();
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
    console.log("listening on 4000 !!");
  });
};

run();
