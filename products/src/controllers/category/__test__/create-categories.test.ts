import request from "supertest";
import { app } from "../../../app";

it("return 200 on successfull creation", async () => {
  request(app)
    .post("/api/products/categories")
    .set("Cookie", await global.signin("admin"))
    .send({ title: "category" })
    .expect(200);
});

it("return 401 if user is not admin", async () => {
  request(app)
    .post("/api/products/categories")
    .set("Cookie", await global.signin("user"))
    .send({ title: "category" })
    .expect(401);
});

// test.todo("return 400 if category already exists");
