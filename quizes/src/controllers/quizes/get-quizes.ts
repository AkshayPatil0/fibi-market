import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { Quiz, QuizDoc } from "../../models/quiz";

export const getQuizesController = async (req: Request, res: Response) => {
  const id = req.query.userId;
  var quizFilter: FilterQuery<QuizDoc> = {};
  if (id) {
    quizFilter.publishedBy = id.toString();

    const quizes = await Quiz.find(quizFilter);
    res.status(200).json(quizes);
  } else {
    res.status(200).json({ error: "userId is required" });
  }
};
