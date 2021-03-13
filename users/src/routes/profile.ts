import express from "express";
import { currentUser, requireAuth } from "@fibimarket/common";
import { User } from "../models/user";

const router = express();

router.get("/api/users/profile", currentUser, async (req, res) => {
  const user = await User.findById(req.currentUser?.id);

  // await new Promise<void>((resolve, reject) => {
  //   setTimeout(() => resolve(), 2000);
  // });

  res.status(200).json(user);
});

export { router as getProfileRoute };
