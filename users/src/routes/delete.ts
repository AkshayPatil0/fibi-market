import {
  currentUser,
  deleteFromAWS,
  nats,
  requireAuth,
  UserRoles,
} from "@fibimarket/common";
import express from "express";
import { UserDeletedPublisher } from "../events/publishers/user-deleted-publisher";
import { VendorDeletedPublisher } from "../events/publishers/vendor-delete-publisher";
import { User } from "../models/user";
const router = express();

router.delete("/api/users", currentUser, requireAuth, async (req, res) => {
  const user = await User.findById(req.currentUser?.id);

  const fileType = user.avatar.split(".").slice(-1)[0];
  await deleteFromAWS(`users/${user.id}.${fileType}`);

  await user.delete();

  if (user.role === UserRoles.user) {
    new UserDeletedPublisher(nats.client).publish({
      id: user.id,
      version: user.version,
    });
  } else if (user.role === UserRoles.vendor) {
    new VendorDeletedPublisher(nats.client).publish({
      id: user.id,
      version: user.version,
    });
  }
  res.send({});
});
router.delete(
  "/api/users/profile/avatar",
  currentUser,
  requireAuth,
  async (req, res) => {
    const user = await User.findById(req.currentUser?.id);

    const fileType = user.avatar.split(".").slice(-1)[0];

    await deleteFromAWS(`users/${user.id}.${fileType}`);

    user.set("avatar", "");

    await user.save();
    res.send({});
  }
);

export { router as deleteRoute };
