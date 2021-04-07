import { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  uploadToAWS,
} from "@fibimarket/common";

import { User } from "../../models/user";
import { updateUser } from "../../helpers/update-user";

export const updateProfileAvatarController = async (
  req: Request,
  res: Response
) => {
  const user = await User.findById(req.currentUser?.id);

  if (!user) {
    throw new NotFoundError("profile");
  }

  if (!req.file) throw new BadRequestError("Avatar is not valid");

  const fileType = req.file.originalname.split(".").slice(-1)[0];
  const key = `users/${user.id}.${fileType}`;

  const avatar = await uploadToAWS(key, req.file.buffer);

  await updateUser(user, {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    role: user.role,
    phoneNo: user.phoneNo,
    addresses: user.addresses,
    avatar,
  });

  res.status(200).json(avatar);
};
