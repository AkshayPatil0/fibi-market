import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { BadRequestError, UserRoles, nats } from "@fibimarket/common";

import { User } from "../../models/user";
import { UserCreatedPublisher } from "../../events/publishers/user-created-publisher";
import { VendorCreatedPublisher } from "../../events/publishers/vendor-created-publisher";

export const signupController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email already exists !");
  }

  if (!Object.values(UserRoles).includes(role)) {
    throw new BadRequestError("Role is invalid !");
  }

  const user = User.build({ firstName, lastName, email, password, role });

  await user.save();

  if (user.role === UserRoles.user) {
    new UserCreatedPublisher(nats.client).publish({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      version: user.version,
    });
  } else if (user.role === UserRoles.vendor) {
    new VendorCreatedPublisher(nats.client).publish({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      version: user.version,
    });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_KEY!
  );
  req.session = {
    jwt: token,
  };
  res.status(201).json(user);
};
