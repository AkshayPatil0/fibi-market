import {
  deleteFromAWS,
  nats,
  NotFoundError,
  UserRoles,
} from "@fibimarket/common";
import fs from "fs";
import { Request, Response } from "express";
import { AdminDeletedPublisher } from "../../events/publishers/admin-deleted-publisher";
import { UserDeletedPublisher } from "../../events/publishers/user-deleted-publisher";
import { VendorDeletedPublisher } from "../../events/publishers/vendor-delete-publisher";
import { User } from "../../models/user";

export const deleteUserController = async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser?.id);

  if (!user) {
    throw new NotFoundError("user");
  }

  // const fileType = user.avatar.split(".").slice(-1)[0];
  // await deleteFromAWS(`users/${user.id}.${fileType}`);
  new Promise<void>((resolve, reject) => {
    fs.unlink(user.avatar, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

  await user.delete();

  if (user.role === UserRoles.user) {
    new UserDeletedPublisher(nats.client).publish({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      version: user.version,
    });
  } else if (user.role === UserRoles.vendor) {
    new VendorDeletedPublisher(nats.client).publish({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      version: user.version,
    });
  } else if (user.role === UserRoles.admin) {
    new AdminDeletedPublisher(nats.client).publish({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      version: user.version,
    });
  }
  res.send({});
};
