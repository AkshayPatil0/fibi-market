import { Request, Response } from "express";
import { NotFoundError } from "@fibimarket/common";

import { User } from "../../models/user";
import { updateUser } from "../../helpers/update-user";

export const updateProfileController = async (req: Request, res: Response) => {
  const { firstName, lastName, addresses, wishlist } = req.body;

  const user = await User.findById(req.currentUser?.id);

  if (!user) {
    throw new NotFoundError("profile");
  }

  await updateUser(user, {
    email: user.email,
    password: user.password,
    role: user.role,
    phoneNo: user.phoneNo,
    avatar: user.avatar,
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
    addresses: addresses || user.addresses,
    wishlist: wishlist || user.wishlist,
  });

  res.status(200).json(user);
};
