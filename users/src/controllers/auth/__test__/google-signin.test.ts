import request from "supertest";
import { app } from "../../../app";

it("returns 200 on successfull signin", async () => {
  await request(app)
    .post("/api/users/googlesignin")
    .send({
      profile: {
        givenName: "test",
        familyName: "test",
        email: "test@gmail.com",
        googleId: "siwriekjv",
      },
    })
    .expect(200);
});

it("returns 400 on invalid email or password", async () => {
  await request(app).post("/api/users/signin").send({}).expect(400);

  await request(app)
    .post("/api/users/googlesignin")
    .send({
      profile: {
        givenName: "",
        familyName: "test",
        email: "test@gmail.com",
        googleId: "siwriekjv",
      },
    })
    .expect(400);

  await request(app)
    .post("/api/users/googlesignin")
    .send({
      profile: {
        givenName: "",
        familyName: "test",
        email: "testcom",
        googleId: "siwriekjv",
      },
    })
    .expect(400);

  await request(app)
    .post("/api/users/googlesignin")
    .send({
      profile: {
        givenName: "",
        familyName: "test",
        email: "testcom",
        googleId: "",
      },
    })
    .expect(400);
});

it("set cookie after successfull signin", async () => {
  const res = await request(app)
    .post("/api/users/googlesignin")
    .send({
      profile: {
        givenName: "test",
        familyName: "test",
        email: "test@gmail.com",
        googleId: "siwriekjv",
      },
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
