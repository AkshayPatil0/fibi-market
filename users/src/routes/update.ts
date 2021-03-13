import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";

import { body } from "express-validator";
import {
  validateRequest,
  BadRequestError,
  UserRoles,
  NotFoundError,
  uploadToAWS,
  currentUser,
  requireAuth,
  nats,
} from "@fibimarket/common";

import { User } from "../models/user";
import { UserUpdatedPublisher } from "../events/publishers/user-updated-publisher";
import { VendorUpdatedPublisher } from "../events/publishers/vendor-updated-publisher";

const router = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.put(
  "/api/users/profile",
  currentUser,
  requireAuth,
  [
    body("firstName").not().isEmpty().withMessage("First name is not valid !"),
    body("lastName").not().isEmpty().withMessage("Last name is not valid !"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;

    const user = await User.findById(req.currentUser?.id);

    if (!user) {
      throw new NotFoundError("profile");
    }

    user.set("firstName", firstName || user.firstName);
    user.set("lastName", lastName || user.lastName);

    await user.save();

    if (user.role === UserRoles.user) {
      new UserUpdatedPublisher(nats.client).publish({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        version: user.version,
      });
    } else if (user.role === UserRoles.vendor) {
      new VendorUpdatedPublisher(nats.client).publish({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        version: user.version,
      });
    }

    res.status(201).json(user);
  }
);

router.put(
  "/api/users/profile/avatar",
  currentUser,
  requireAuth,
  upload.single("avatar"),
  async (req, res) => {
    const user = await User.findById(req.currentUser?.id);

    if (!user) {
      throw new NotFoundError("profile");
    }

    if (!req.file) throw new BadRequestError("Avatar is not valid");

    const fileType = req.file.originalname.split(".").slice(-1)[0];
    const key = `users/${user.id}.${fileType}`;

    const avatar = await uploadToAWS(key, req.file.buffer);

    user.set("avatar", avatar);

    await user.save();

    res.status(200).json(avatar);
  }
);

export { router as updateProfileRoute };
