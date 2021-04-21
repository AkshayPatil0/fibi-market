import mongoose from "mongoose";

export interface CategoryAttrs {
  title: string;
  parent: string;
  slug: string;
  image?: string;
  minPrice?: number;
  maxPrice?: number;
  isLocation?: boolean;
  blog?: string;
  description?: string;
}

interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

export interface CategoryDoc extends mongoose.Document {
  title: string;
  parent: string;
  slug: string;
  image: string;
  minPrice: number;
  maxPrice: number;
  isLocation: boolean;
  blog: string;
  description: string;
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
    image: String,
    blog: String,
    description: String,
    minPrice: Number,
    maxPrice: Number,
    isLocation: {
      type: Boolean,
      default: false,
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
