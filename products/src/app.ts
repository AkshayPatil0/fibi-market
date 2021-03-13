import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import morgan from "morgan";
import { currentUser, errorHandler, NotFoundError } from "@fibimarket/common";

import { getRoute } from "./routes/get";
import { newProductRoute } from "./routes/new";
import { updateProductRoute } from "./routes/update";
import { deleteProductRoute } from "./routes/delete";
import { categoryRoute } from "./routes/category";

const app = express();

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

app.use(categoryRoute);
app.use(getRoute);
app.use(newProductRoute);
app.use(updateProductRoute);
app.use(deleteProductRoute);

app.all("*", () => {
  throw new NotFoundError("route");
});

app.use(errorHandler);

export { app };
