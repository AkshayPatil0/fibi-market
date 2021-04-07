import { Request, Response } from "express";
import { NotFoundError } from "@fibimarket/common";

import { User } from "../../models/user";
import { updateUser } from "../../helpers/update-user";

export const updateProfileController = async (req: Request, res: Response) => {
  const { firstName, lastName, addresses } = req.body;

  const user = await User.findById(req.currentUser?.id);

  if (!user) {
    throw new NotFoundError("profile");
  }

  await updateUser(user, {
    email: user.email,
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
    password: user.password,
    role: user.role,
    phoneNo: user.phoneNo,
    addresses: addresses || user.addresses,
    avatar: user.avatar,
  });

  res.status(201).json(user);
};
