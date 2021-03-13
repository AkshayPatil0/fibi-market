import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { body } from "express-validator";
import {
  validateRequest,
  BadRequestError,
  UserRoles,
} from "@fibimarket/common";

import { User } from "../models/user";
import { Password } from "../services/password";

const router = express();

router.post("/api/users/googlesignin", async (req, res) => {
  const { profile } = req.body;

  // console.log(profile)
  let user = await User.findOne({ email: profile.email });

  if (!user) {
    user = User.build({
      firstName: profile.givenName,
      lastName: profile.familyName,
      email: profile.email,
      password: profile.googleId,
      role: UserRoles.user,
      avatar: profile.imageUrl,
    });

    await user.save();
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_KEY!
  );
  req.session = {
    jwt: token,
  };

  res.status(200).json(user);
});

export { router as googleSigninRoute };
