import { Request, Response } from "express";
import { UserRoles } from "@fibimarket/common";
import { User, UserDoc } from "../../models/user";
import { FilterQuery } from "mongoose";

export const getUsersController = async (req: Request, res: Response) => {
  const { role, email } = req.query;

  var userFilter: FilterQuery<UserDoc> = {};

  if (role && Object.values(UserRoles).includes(<any>role)) {
    userFilter.role = { $eq: (<any>UserRoles)[role.toString()] };
  }

  if (email) {
    const re = `.*(${email}).*`;
    userFilter.email = { $regex: new RegExp(re) };
  }

  const users = await User.find(userFilter);

  res.status(200).json(users);
};
