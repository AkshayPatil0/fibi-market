import request from "supertest";
import { app } from "../../../app";
import { Product } from "../../../models/product";
import mongoose from "mongoose";

it("returns 200 on successful fetch", async () => {
  await global.createProduct();
  await global.createProduct();
  await global.createProduct();

  const productRes = await request(app).get(`/api/products`).expect(200);

  expect(productRes.body.length).toEqual(3);
});
