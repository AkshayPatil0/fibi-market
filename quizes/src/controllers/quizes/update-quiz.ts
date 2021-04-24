import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { Quiz, QuizDoc } from "../../models/quiz";

export const updateQuizController = async (req: Request, res: Response) => {
  const id = req.params.id;
  var quizFilter: FilterQuery<QuizDoc> = {};
  if (id) {
    quizFilter.publishedBy = id.toString();
    const quiz = await Quiz.updateOne({ _id: id }, req.body);
    res.status(200).json(quiz);
  } else {
    res.status(200).json({ error: "quizId is required" });
  }
};
