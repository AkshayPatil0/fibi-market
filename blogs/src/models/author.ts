import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

//type definition of author attributes
export interface AuthorAttrs {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo?: string;
  avatar?: string;
}
//type definition of author model
export interface AuthorModel extends mongoose.Model<AuthorDoc> {
  build(attrs: AuthorAttrs): AuthorDoc;
}

//type definition of author document
export interface AuthorDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  avatar: string;
  version: number;
}

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: String,
    phoneNo: {
      type: String,
    },
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

authorSchema.set("versionKey", "version");
authorSchema.plugin(updateIfCurrentPlugin);

authorSchema.statics.build = (attrs: AuthorAttrs) => {
  return new Author(attrs);
};

const Author = mongoose.model<AuthorDoc, AuthorModel>("authors", authorSchema);

export { Author };
