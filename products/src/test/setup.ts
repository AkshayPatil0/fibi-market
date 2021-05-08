import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";
import { Product } from "../models/product";

import * as Common from "@fibimarket/common";

jest.mock("@fibimarket/common", () => ({
  ...(jest.requireActual("@fibimarket/common") as typeof Common),
  nats: {
    client: {
      publish: async (subject: string, data: any, cb: () => void) => {
        cb();
      },
    },
  },
}));

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
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
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
    description: "product description",
    sku: "PR" + Math.random(),
    price: { mrp: 100, retail: 50 },
    stock: 10,
    vendor: new mongoose.Types.ObjectId().toHexString(),
  });

  return product.save();
};
