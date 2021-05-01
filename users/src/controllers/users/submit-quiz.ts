import { Request, Response } from "express";
import { BadRequestError, NotFoundError, UserRoles } from "@fibimarket/common";
import { User } from "../../models/user";

export const submitQuiz = async (req: Request, res: Response) => {
  const { userId, quizId, points } = req.body;

  let user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("user");
  }
  const currentPoints = user.rewardPoints;

  user.set({
    rewardPoints: currentPoints + points,
  });
  user.quizes.push({
    id: quizId,
    points,
  });

  user = await user.save();

  res.status(200).json(user);
};
