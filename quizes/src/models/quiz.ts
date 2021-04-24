import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { UserRoles } from "@fibimarket/common";

//type definition of user attributes
export interface QuizAttrs {
  title: string;
  status: number;
  publisheBy: string;
  questions: {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
  }[];
}
//type definition of user model
export interface QuizModel extends mongoose.Model<QuizDoc> {
  build(attrs: QuizAttrs): QuizDoc;
}

//type definition of user document
export interface QuizDoc extends mongoose.Document {
  title: string;
  status: number;
  publisheBy: string;
  questions: {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
  }[];
}

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
    },
    publishedBy: {
      type: String,
      required: true,
    },
    questions: [Object],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

quizSchema.set("versionKey", "version");
quizSchema.plugin(updateIfCurrentPlugin);

const Quiz = mongoose.model<QuizDoc, QuizModel>("quizes", quizSchema);

export { Quiz };
