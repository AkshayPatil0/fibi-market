import request from "supertest";
import { app } from "../../../app";
import { Product } from "../../../models/product";
import mongoose from "mongoose";

it("returns 200 on successful update", async () => {
  // const product = await global.createProduct()
  const cookie = await global.signin("vendor");
  const product = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .send({
      title: "product1",
      description: "product description",
      sku: "PR",
      price: { mrp: 100, retail: 50 },
      stock: 10,
    });

  const title = "sdgbd";
  const price = { mrp: 200, retail: 100 };
  const description = "product description";
  const sku = "PR";
  const stock = 10;
  const productRes = await request(app)
    .put(`/api/products/${product.body.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      description,
      sku,
      stock,
      price,
    })
    .expect(200);

  expect(productRes.body.title).toEqual(title);
});

it("returns 404 on invalid product id", async () => {
  await request(app)
    .put(`/api/products/${mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", await global.signin("vendor"))
    .send({
      title: "product1",
      description: "product description",
      sku: "PR",
      price: { mrp: 100, retail: 50 },
      stock: 10,
    })
    .expect(404);
});

it("returns 400 on invalid input", async () => {
  const cookie = await global.signin("vendor");
  const product = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .send({
      title: "product1",
      description: "product description",
      sku: "PR",
      price: { mrp: 100, retail: 50 },
      stock: 10,
    });

  await request(app)
    .put(`/api/products/${product.body.id}`)
    .set("Cookie", cookie)
    .send({
      price: { mrp: 100, retail: 50 },
      stock: -10,
    })
    .expect(400);

  await request(app)
    .put(`/api/products/${product.body.id}`)
    .set("Cookie", cookie)
    .send({
      price: { mrp: 100, retail: -50 },
      stock: 10,
    })
    .expect(400);

  await request(app)
    .put(`/api/products/${product.body.id}`)
    .set("Cookie", cookie)
    .send({
      price: { mrp: -50, retail: 50 },
      stock: 10,
    })
    .expect(400);
});

it("returns 401 on if user not authorized", async () => {
  const product = await global.createProduct();

  await request(app)
    .put(`/api/products/${product.id}`)
    .send({
      title: "product1",
      description: "product description",
      sku: "PR",
      price: { mrp: 100, retail: 50 },
      stock: 10,
    })
    .expect(401);
});

it("returns 401 on if vendor does not own the product", async () => {
  const product = await global.createProduct();

  const productRes = await request(app)
    .put(`/api/products/${product.id}`)
    .set("Cookie", await global.signin("vendor"))
    .send({
      title: "product1",
      description: "product description",
      sku: "PR",
      price: { mrp: 100, retail: 50 },
      stock: 10,
    })
    .expect(401);
});
