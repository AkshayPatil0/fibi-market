import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import morgan from "morgan";
import { currentUser, errorHandler, NotFoundError } from "@fibimarket/common";

import { categoryRoutes } from "./routes/category";
import { productRoutes } from "./routes/product";

const app = express();

app.disable("etag");
app.use(json());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(morgan("dev"));
app.use(currentUser);

app.use("/api/products/categories", categoryRoutes);
app.use("/api/products/", productRoutes);

app.all("*", () => {
  throw new NotFoundError("route");
});

app.use(errorHandler);

export { app };
