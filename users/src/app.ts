import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import { errorHandler, NotFoundError } from "@fibimarket/common";

import { signinRoute } from "./routes/signin";
import { googleSigninRoute } from "./routes/google-signin";
import { signupRoute } from "./routes/signup";
import { signoutRoute } from "./routes/signout";
import {getUsersRoute} from './routes/get';
import { getProfileRoute } from "./routes/profile";
import { updateProfileRoute } from "./routes/update";
import { setRoleRoute } from "./routes/set-role";
import { deleteRoute } from "./routes/delete";

const app = express();

app.use(json());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test'
  })
);
app.use(cookieParser());

app.use(signinRoute);
app.use(googleSigninRoute);
app.use(signupRoute);
app.use(signoutRoute);
app.use(getProfileRoute);
app.use(updateProfileRoute);
app.use(setRoleRoute);
app.use(deleteRoute);
app.use(getUsersRoute)

app.all("*", () => {
  throw new NotFoundError("route");
});

app.use(errorHandler);

export { app };
