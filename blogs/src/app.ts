import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import morgon from "morgan";

import { currentUser, errorHandler, NotFoundError } from "@fibimarket/common";
import { blogRoutes } from "./routes/blog";

const app = express();

app.use(json());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test",
  })
);

app.use(morgon("dev"));

app.use(currentUser);

app.use("/api/blogs/uploads", express.static("uploads"))

app.use("/api/blogs", blogRoutes);

app.all("*", () => {
  throw new NotFoundError("route");
});

app.use(errorHandler);

export { app };
