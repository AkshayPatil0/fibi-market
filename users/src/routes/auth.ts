import express from "express";

import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@fibimarket/common";
import { signinController } from "../controllers/auth/signin";
import { signupController } from "../controllers/auth/signup";
import { googleSigninController } from "../controllers/auth/google-signin";

const router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email is not valid !"),
    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage(
        "Password must be at least 6 and at most 20 characters long !"
      ),
  ],
  validateRequest,
  signinController
);

router.post("/googlesignin", googleSigninController);

router.post(
  "/signup",
  [
    body("firstName").not().isEmpty().withMessage("First name is not valid !"),
    body("email").isEmail().withMessage("Email is not valid !"),
    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage(
        "Password must be at least 6 and at most 20 characters long !"
      ),
  ],
  validateRequest,
  signupController
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send({});
});
export { router as authRoutes };
