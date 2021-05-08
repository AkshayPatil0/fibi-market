import request from "supertest";
import { app } from "../../../app";
import { Product } from "../../../models/product";
// import mongoose from "mongoose";

it("returns 201 on successfull creation of product", async () => {
  let products = await Product.find();
  expect(products.length).toEqual(0);

  const title = "product1";
  const description = "product description";
  const sku = "PR";
  const price = { mrp: 100, retail: 50 };
  const stock = 10;
  await request(app)
    .post("/api/products")
    .set("Cookie", await global.signin("vendor"))
    .send({
      title,
      description,
      sku,
      stock,
      price,
    })
    .expect(201);

  products = await Product.find();
  expect(products.length).toEqual(1);
  expect(products[0].title).toEqual(title);
  expect(JSON.stringify(products[0].price)).toEqual(JSON.stringify(price));
});

it("returns 400 on invalid input", async () => {
  await request(app)
    .post("/api/products")
    .set("Cookie", await global.signin("vendor"))
    .send({
      title: "",
      price: { mrp: 100, retail: 50 },
      description: "diufdjk",
      sku: "afoif",
      stock: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/products")
    .set("Cookie", await global.signin("vendor"))
    .send({
      title: "dviukn",
      price: { mrp: 100 },
      description: "diufdjk",
      sku: "afoif",
      stock: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/products")
    .set("Cookie", await global.signin("vendor"))
    .send({
      title: "xfojvo",
      price: { mrp: 100, retail: 50 },
      description: "",
      sku: "sdf",
      stock: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/products")
    .set("Cookie", await global.signin("vendor"))
    .send({
      title: "xfojvo",
      price: { mrp: 100, retail: 50 },
      description: "dvvjn",
      sku: "",
      stock: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/products")
    .set("Cookie", await global.signin("vendor"))
    .send({
      title: "xfojvo",
      price: { mrp: 100, retail: 50 },
      description: "",
      sku: "sdf",
      stock: -20,
    })
    .expect(400);
});

it("returns 401 on unauthorized request", async () => {
  await request(app)
    .post("/api/products")
    .send({
      title: "product1",
      price: 50,
    })
    .expect(401);

  await request(app)
    .post("/api/products")
    .set("Cookie", await global.signin("user"))
    .send({
      title: "sdiuhi",
      price: { mrp: 100, retail: 50 },
      description: "diufdjk",
      sku: "afoif",
      stock: 10,
    })
    .expect(401);
});
