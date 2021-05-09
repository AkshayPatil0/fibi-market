import request from "supertest";
import { app } from "../../../app";
import { Order } from "../../../models/order";

it("return 200 on successfull creation", async () => {
  let orders = await Order.find();
  expect(orders.length).toEqual(0);
  await request(app)
    .post("/api/orders/")
    .set("Cookie", await global.signin())
    .send({})
    .expect(201);

  orders = await Order.find();
  expect(orders.length).toEqual(1);
});

it("return 401 if user is not admin", async () => {
  await request(app)
    .post("/api/products/categories")
    .set("Cookie", await global.signin("user"))
    .send({ title: "category" })
    .expect(401);

  await request(app)
    .post("/api/products/categories")
    .set("Cookie", await global.signin("vendor"))
    .send({ title: "category" })
    .expect(401);
});

it("return 400 if category already exists", async () => {
  await request(app)
    .post("/api/products/categories")
    .set("Cookie", await global.signin("admin"))
    .send({ title: "category" })
    .expect(201);

  await request(app)
    .post("/api/products/categories")
    .set("Cookie", await global.signin("admin"))
    .send({ title: "category" })
    .expect(400);
});
