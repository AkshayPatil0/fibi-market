import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UserRoles } from "@fibimarket/common";

import { User } from "../../models/user";

export const googleSigninController = async (req: Request, res: Response) => {
  const { profile } = req.body;

  let user = await User.findOne({ email: profile.email });

  if (!user) {
    user = User.build({
      firstName: profile.givenName,
      lastName: profile.familyName,
      email: profile.email,
      password: profile.googleId,
      role: UserRoles.user,
      avatar: profile.imageUrl,
    });

    await user.save();
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_KEY!
  );
  req.session = {
    jwt: token,
  };

  res.status(200).json(user);
};
