import {
  BadRequestError,
  currentUser,
  NotFoundError,
  requireAuth,
  UserRoles,
} from "@fibimarket/common";
import express from "express";
import { authRole } from "@fibimarket/common";
import { User } from "../models/user";
const router = express.Router();

router.post(
  "/api/users/setrole",
  currentUser,
  requireAuth,
  authRole(UserRoles.admin),
  async (req, res) => {
    const { userId, role } = req.body;

    if (!Object.values(UserRoles).includes(role)) {
      throw new BadRequestError("Role is not valid !");
    }

    let user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("user");
    }

    user.set({
      role: role,
    });

    user = await user.save();

    res.status(200).json(user);
  }
);

export { router as setRoleRoute };
