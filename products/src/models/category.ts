import mongoose from "mongoose";

export interface CategoryAttrs {
  title: string;
  parent: string;
  slug: string;
  isLocation?: boolean;
}

interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

export interface CategoryDoc extends mongoose.Document {
  title: string;
  parent: string;
  slug: string;
  isLocation: boolean
}

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
    },
    isLocation: {
      type: Boolean,
      default: false
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

categorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModel>(
  "categories",
  categorySchema
);

export { Category };
