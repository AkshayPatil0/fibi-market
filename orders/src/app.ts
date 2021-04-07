import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import morgon from "morgan";

import {
  currentUser,
  errorHandler,
  NotFoundError,
  requireAuth,
} from "@fibimarket/common";

import { cartRoutes } from "./routes/cart";
import { orderRoutes } from "./routes/order";

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
app.use(requireAuth);

app.use("/api/orders/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.all("*", () => {
  throw new NotFoundError("route");
});

app.use(errorHandler);

export { app };
