import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";
import { Product } from "../models/product";

let mongo: any;

declare global {
  namespace NodeJS {
    interface Global {
      signin(role?: string | undefined): Promise<string[]>;
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

global.signin = async (role: string = "user") => {
  const user = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
    role,
  };

  const session = { jwt: jwt.sign(user, process.env.JWT_KEY!) };

  return [
    `express:sess=${Buffer.from(JSON.stringify(session)).toString("base64")}`,
  ];
};
