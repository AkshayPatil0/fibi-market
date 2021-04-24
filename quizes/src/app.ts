import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler, NotFoundError } from "@fibimarket/common";

import { quizesRoute } from "./routes/quizes";

const app = express();

app.use(json());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(morgan("dev"));

app.use(cookieParser());

app.use("/api/quizes/", quizesRoute);

app.all("*", () => {
  throw new NotFoundError("route");
});

app.use(errorHandler);

export { app };
