import express from "express";
import multer from "multer";

import { body } from "express-validator";
import {
  validateRequest,
  currentUser,
  requireAuth,
  NotFoundError,
} from "@fibimarket/common";
import { User } from "../models/user";
import { updateProfileController } from "../controllers/profile/update-profile";
import { updateProfileAvatarController } from "../controllers/profile/update-profile-avatar";
import { deleteProfileAvatarController } from "../controllers/profile/delete-profile-avatar";

const router = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", currentUser, async (req, res) => {
  const user = await User.findById(req.currentUser?.id);

  res.status(200).json(user);
});

router.put(
  "/",
  currentUser,
  requireAuth,
  [
    body("firstName").not().isEmpty().withMessage("First name is not valid !"),
    // body("lastName").not().isEmpty().withMessage("Last name is not valid !"),
  ],
  validateRequest,
  updateProfileController
);

router.put(
  "/avatar",
  currentUser,
  requireAuth,
  upload.single("avatar"),
  updateProfileAvatarController
);

router.delete(
  "/avatar",
  currentUser,
  requireAuth,
  deleteProfileAvatarController
);

router.get("/wishlist", currentUser, requireAuth, async (req, res) => {
  const user = await User.findById(req.currentUser?.id);

  if (!user) {
    throw new NotFoundError("user");
  }

  res.status(200).json(user.wishlist);
});

export { router as profileRoute };
