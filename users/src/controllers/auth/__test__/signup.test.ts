import request from "supertest";
import { app } from "../../../app";

it("returns 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
      password: "123456",
    })
    .expect(201);
});

it("returns 400 on invalid email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "",
      lastName: "test",
      email: "test@test.com",
      password: "123456",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "test",
      lastName: "test",
      email: "test.com",
      password: "123456",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "test",
      lastName: "test",
      email: "",
      password: "123456",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
      password: "123",
    })
    .expect(400);
});

it("set cookie after successfull signup", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
      password: "123456",
    })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
