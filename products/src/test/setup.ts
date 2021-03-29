import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { nats } from "@fibimarket/common";

import jwt from "jsonwebtoken";
import { Product } from "../models/product";

let mongo: any;

declare global {
  namespace NodeJS {
    interface Global {
      signin(role: string): Promise<string[]>;
      createProduct(): Promise<any>;
    }
  }
}

beforeAll(async () => {
  process.env.JWT_KEY = "dsflirfp9g$^Yugv";
  process.env.NATS_CLUSTER_ID = "fibimarket";
  process.env.NATS_CLIENT_ID = `test${Math.random().toString(36).substr(2, 5)}`;
  process.env.NATS_URL = "http://localhost:4223";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // await nats.connect("fibimarket-test", `test${Math.random().toString(36).substr(2, 5)}`, "http://localhost:4223")
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  nats.client.close();
  await new Promise<void>((resolve) => {
    nats.client.on("close", () => {
      resolve();
    });
  });
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async (role: string) => {
  const user = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
    role: role,
  };

  const session = { jwt: jwt.sign(user, process.env.JWT_KEY!) };

  return [
    `express:sess=${Buffer.from(JSON.stringify(session)).toString("base64")}`,
  ];
};

global.createProduct = async () => {
  const product = Product.build({
    title: "product",
    price: 50,
    stock: 10,
    vendor: new mongoose.Types.ObjectId().toHexString(),
  });

  return product.save();
};
