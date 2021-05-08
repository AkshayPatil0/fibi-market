import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";
import * as Common from "@fibimarket/common";

jest.mock("@fibimarket/common", () => ({
  ...(jest.requireActual("@fibimarket/common") as typeof Common),
  nats: { client: { publish: () => {}, listen: () => {} } },
}));

let mongo: any;

declare global {
  namespace NodeJS {
    interface Global {
      signin(role: string | undefined): Promise<string[]>;
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
