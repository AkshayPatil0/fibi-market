import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@fibimarket/common";

import { User } from "../models/user";
import { Password } from "../services/password";

const router = express();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email is not valid !"),
    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage(
        "Password must be at least 6 and at most 20 characters long !"
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Email or password is invalid");
    }

    const passwordMatch = await Password.compare(user.password, password);
    if (!passwordMatch) {
      throw new BadRequestError("Email or password is invalid");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };

    res.status(200).json(user);
  }
);

export { router as signinRoute };
