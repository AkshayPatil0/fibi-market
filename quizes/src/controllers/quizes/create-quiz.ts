import { Request, Response } from "express";
import { Quiz } from "../../models/quiz";

export const createQuizController = async (req: Request, res: Response) => {
  const quiz = new Quiz(req.body);
  const publishedQuiz = await quiz.save();

  res.status(200).json(publishedQuiz);
};
