import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler, NotFoundError } from "@fibimarket/common";

import { authRoutes } from "./routes/auth";
import { usersRoute } from "./routes/users";
import { profileRoute } from "./routes/profile";

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

app.use("/api/users/uploads", express.static("uploads"))

app.use("/api/users/profile", profileRoute);
app.use("/api/users/", usersRoute);
app.use("/api/users/", authRoutes);

app.all("*", () => {
  throw new NotFoundError("route");
});

app.use(errorHandler);

export { app };
