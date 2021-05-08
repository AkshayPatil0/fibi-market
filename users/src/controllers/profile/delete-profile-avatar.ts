import { Request, Response } from "express";
import { deleteFromAWS, NotFoundError } from "@fibimarket/common";
import { User } from "../../models/user";
import { updateUser } from "../../helpers/update-user";
import fs from "fs";

export const deleteProfileAvatarController = async (
  req: Request,
  res: Response
) => {
  const user = await User.findById(req.currentUser?.id);

  if (!user) {
    throw new NotFoundError("user");
  }

  // const fileType = user.avatar.split(".").slice(-1)[0];
  // await deleteFromAWS(`users/${user.id}.${fileType}`);

  await new Promise<void>((resolve, reject) => {
    const filename = user.avatar.split("/").slice(-1)[0];
    fs.unlink(`uploads/users/${filename}`, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

  await updateUser(user, {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    role: user.role,
    phoneNo: user.phoneNo,
    addresses: user.addresses,
    avatar: "",
  });
  res.send({});
};
