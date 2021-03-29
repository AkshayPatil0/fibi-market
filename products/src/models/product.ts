import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface ProductAttrs {
  title: string;
  sku: string;
  description: string;
  vendor: string;
  price: { mrp: number; retail: number };
  specs?: { name: string; value: string }[];
  stock?: number;
  images?: string[];
  category?: string;
  location?: string;
  hasVariants?: boolean;
  variations?: object;
  variants?: {
    id: string;
    variation: object;
    price: { mrp: number; retail: number };
    sku: string;
    stock: number;
  }[];
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

export interface ProductDoc extends mongoose.Document {
  title: string;
  sku: string;
  description: string;
  vendor: string;
  price: { mrp: number; retail: number };
  specs: { name: string; value: string }[];
  stock: number;
  images: string[];
  category: string;
  location: string;
  hasVariants: boolean;
  variations: object;
  variants: {
    id: string;
    variation: object;
    price: { mrp: number; retail: number };
    sku: string;
    stock: number;
  }[];
  version: number;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    description: String,
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "vendors",
      required: true,
    },
    price: {
      mrp: {
        type: Number,
        required: true,
      },
      retail: {
        type: Number,
        required: true,
      },
    },
    specs: {
      type: [
        {
          name: String,
          value: String,
        },
      ],
      default: [],
    },
    hasVariants: Boolean,
    variations: {},
    variants: {
      type: [Object],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
    },
    location: {
      type: mongoose.Types.ObjectId,
      ref: "locations",
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
