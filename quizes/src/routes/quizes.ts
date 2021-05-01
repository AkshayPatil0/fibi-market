import express from "express";
import {
  getAllQuizesController,
  getQuizesController,
} from "../controllers/quizes/get-quizes";
import { updateQuizController } from "../controllers/quizes/update-quiz";
import { createQuizController } from "../controllers/quizes/create-quiz";

const router = express();

router.get("/", getQuizesController);
router.get("/all", getAllQuizesController);
router.post("/", createQuizController);

router.put("/:id", updateQuizController);

export { router as quizesRoute };
