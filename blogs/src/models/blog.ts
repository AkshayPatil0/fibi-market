import mongoose from "mongoose";

export interface BlogAttrs {
  title: string;
  slug: string;
  description: string;
  body: string;
  author: string;
  relevances?: {
    products: string[];
    categories: string[];
    locations: string[];
  };
  images?: string[];
}

export interface BlogModel extends mongoose.Model<BlogDoc> {
  build(attrs: BlogAttrs): BlogDoc;
}

export interface BlogDoc extends mongoose.Document {
  title: string;
  slug: string;
  description: string;
  body: string;
  author: string;
  relevances: { products: string[]; categories: string[]; locations: string[] };
  images: string[];
}

const blogSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "authors",
      required: true,
    },
    relevances: {
      type: Object,
      default: {},
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

blogSchema.statics.build = (attrs: BlogAttrs) => {
  return new Blog(attrs);
};

const Blog = mongoose.model<BlogDoc, BlogModel>("blogs", blogSchema);

export { Blog };
