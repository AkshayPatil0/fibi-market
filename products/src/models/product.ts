import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface ProductAttrs {
  title: string;
  price: number;
  vendor: string;
  stock: number;
  category: string;
  location: string | null | undefined;
  images: string[];
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

export interface ProductDoc extends mongoose.Document {
  title: string;
  price: number;
  vendor: string;
  stock: number;
  images: string[];
  category: string;
  location: string;
  version: number;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // decription: String,
    price: {
      type: Number,
      required: true,
      // mrp: {
      //   type: Number,
      //   required: true,
      // },
      // retail: {
      //   type: Number,
      //   required: true,
      // },
      // saving_perc: Number
    },
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "vendors",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    location: {
      type: mongoose.Types.ObjectId,
      ref: "locations",
    },
    stock: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
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

productSchema.set("versionKey", "version");
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "products",
  productSchema
);

export { Product };
