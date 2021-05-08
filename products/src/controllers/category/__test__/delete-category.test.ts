import request from "supertest";
import { app } from "../../../app";
import { Category } from "../../../models/category";
import mongoose from "mongoose";

it("return 200 on successfull deletion", async () => {
  const cookie = await global.signin("admin");

  let categories = await Category.find();
  expect(categories.length).toEqual(0);

  const res = await request(app)
    .post("/api/products/categories")
    .set("Cookie", cookie)
    .send({ title: "category" })
    .expect(201);

  categories = await Category.find();
  expect(categories.length).toEqual(1);

  await request(app)
    .delete(`/api/products/categories/${res.body.id}`)
    .set("Cookie", cookie)
    .expect(200);

  categories = await Category.find();
  expect(categories.length).toEqual(0);
});

it("return 401 if user is not admin", async () => {
  const res = await request(app)
    .post("/api/products/categories")
    .set("Cookie", await global.signin("admin"))
    .send({ title: "category" })
    .expect(201);

  await request(app)
    .delete(`/api/products/categories/${res.body.id}`)
    .set("Cookie", await global.signin("user"))
    .expect(401);

  await request(app)
    .delete(`/api/products/categories/${res.body.id}`)
    .set("Cookie", await global.signin("vendor"))
    .expect(401);
});

it("return 404 if category is not found", async () => {
  await request(app)
    .delete(`/api/products/categories/${new mongoose.Types.ObjectId()}`)
    .set("Cookie", await global.signin("admin"))
    .expect(404);
});
