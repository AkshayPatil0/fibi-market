import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import {
  currentUser,
  errorHandler,
  NotFoundError,
  requireAuth,
} from "@fibimarket/common";

import { getOrdersRoute } from "./routes/get";
import { newOrderRoute } from "./routes/new";
import { showOrderRoute } from "./routes/show";
import { cartRoutes } from "./routes/cart";
import { cancelOrderRoute } from "./routes/delete";

const app = express();

app.use(json());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(requireAuth);

app.use(getOrdersRoute);
app.use(newOrderRoute);
app.use(showOrderRoute);
app.use(cancelOrderRoute);
app.use(cartRoutes);

app.all("*", () => {
  throw new NotFoundError("route");
});

app.use(errorHandler);

export { app };
