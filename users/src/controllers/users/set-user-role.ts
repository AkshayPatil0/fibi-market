import { Request, Response } from "express";
import { BadRequestError, NotFoundError, UserRoles } from "@fibimarket/common";
import { User } from "../../models/user";

export const setUserRoleController = async (req: Request, res: Response) => {
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
};
