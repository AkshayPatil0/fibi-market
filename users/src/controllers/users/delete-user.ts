import { deleteFromAWS, nats, UserRoles } from "@fibimarket/common";
import { Request, Response } from "express";
import { AdminDeletedPublisher } from "../../events/publishers/admin-deleted-publisher";
import { UserDeletedPublisher } from "../../events/publishers/user-deleted-publisher";
import { VendorDeletedPublisher } from "../../events/publishers/vendor-delete-publisher";
import { User } from "../../models/user";

export const deleteUserController = async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser?.id);

  const fileType = user.avatar.split(".").slice(-1)[0];
  await deleteFromAWS(`users/${user.id}.${fileType}`);

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
