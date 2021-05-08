import request from "supertest";
import { app } from "../../../app";
import { Product } from "../../../models/product";
import mongoose from "mongoose";

it("deletes product succesfully !", async () => {
  let products = await Product.find();
  expect(products.length).toEqual(0);
  const cookie = await global.signin("vendor");
  const res = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .send({
      title: "sdiuhi",
      price: { mrp: 100, retail: 50 },
      description: "diufdjk",
      sku: "afoif",
      stock: 10,
    })
    .expect(201);

  products = await Product.find();
  expect(products.length).toEqual(1);

  await request(app)
    .delete(`/api/products/${res.body.id}`)
    .set("Cookie", cookie)
    .expect(200);

  products = await Product.find();
  expect(products.length).toEqual(0);
});

it("gives 401 if not authorized !", async () => {
  const res = await request(app)
    .post("/api/products")
    .set("Cookie", await global.signin("vendor"))
    .send({
      title: "sdiuhi",
      price: { mrp: 100, retail: 50 },
      description: "diufdjk",
      sku: "afoif",
      stock: 10,
    })
    .expect(201);

  await request(app)
    .delete(`/api/products/${res.body.id}`)
    .set("Cookie", await global.signin("vendor"))
    .expect(401);
});

it("gives 404 if not found !", async () => {
  await request(app)
    .delete(`/api/products/${new mongoose.Types.ObjectId()}`)
    .set("Cookie", await global.signin("vendor"))
    .expect(404);
});
