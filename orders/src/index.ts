import mongoose from "mongoose";

// import nats from "./nats";
import { nats } from "@fibimarket/common";

import { app } from "./app";
import { ProductCreatedListener } from "./events/listeners/product-created-listener";

import env from "dotenv";
import { ProductUpdatedListener } from "./events/listeners/product-updated-listener";
import { ProductDeletedListener } from "./events/listeners/product-deleted-listener";
import { VendorCreatedListener } from "./events/listeners/vendor-created-listener";
import { VendorUpdatedListener } from "./events/listeners/vendor-updated-listner";
import { VendorDeletedListener } from "./events/listeners/vendor-deleted-listener";
import { UserCreatedListener } from "./events/listeners/user-created-listener";
import { UserUpdatedListener } from "./events/listeners/user-updated-listner";
import { UserDeletedListener } from "./events/listeners/user-deleted-listener";
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
    new VendorCreatedListener(nats.client).listen();
    new VendorUpdatedListener(nats.client).listen();
    new VendorDeletedListener(nats.client).listen();
    new UserCreatedListener(nats.client).listen();
    new UserUpdatedListener(nats.client).listen();
    new UserDeletedListener(nats.client).listen();
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
