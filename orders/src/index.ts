import mongoose from "mongoose";

// import nats from "./nats";
import { nats } from "@fibimarket/common";

import { app } from "./app";
import { ProductCreatedListener } from "./events/listeners/product-created-listener";

import env from "dotenv";
import { ProductUpdatedListener } from "./events/listeners/product-updated-listener";
import { ProductDeletedListener } from "./events/listeners/product-deleted-listener";
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

    new ProductCreatedListener(nats.client).listen();
    new ProductUpdatedListener(nats.client).listen();
    new ProductDeletedListener(nats.client).listen();
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

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`listening on ${port} !!`);
  });
};

run();
