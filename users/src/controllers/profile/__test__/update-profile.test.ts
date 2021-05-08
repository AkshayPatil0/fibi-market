import request from "supertest";
import { app } from "../../../app";

it("returns 200 on successfull update", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
      password: "123456",
    })
    .expect(201);

  await request(app)
    .put("/api/users/profile")
    .set("Cookie", res.get("Set-Cookie"))
    .send({
      firstName: "test2",
      lastName: "test2",
      avatar: "imageurl",
    })
    .expect(200);
});

it("returns 401 if not logged in", async () => {
  await request(app)
    .put("/api/users/profile")
    .send({
      firstName: "test",
    })
    .expect(401);
});

it("returns 400 on invalid email or password", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
      password: "123456",
    })
    .expect(201);

  await request(app)
    .put("/api/users/profile")
    .set("Cookie", res.get("Set-Cookie"))
    .send({
      firstName: "",
    })
    .expect(400);
});
