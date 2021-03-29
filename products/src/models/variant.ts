import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface VariantAttrs {
  title?: string;
  price?: { mrp: number; retail: number };
  specs?: { name: string; value: string }[];
  stock?: number;
  images?: string[];
}

interface VariantModel extends mongoose.Model<VariantDoc> {
  build(attrs: VariantAttrs): VariantDoc;
}

export interface VariantDoc extends mongoose.Document {
  title: string;
  price: { mrp: number; retail: number };
  specs: { name: string; value: string }[];
  stock: number;
  images: string[];
  version: number;
}

const variantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      mrp: {
        type: Number,
      },
      retail: {
        type: Number,
      },
    },
    specs: [
      {
        name: String,
        value: String,
      },
    ],

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

variantSchema.set("versionKey", "version");
variantSchema.plugin(updateIfCurrentPlugin);

variantSchema.statics.build = (attrs: VariantAttrs) => {
  return new Variant(attrs);
};

const Variant = mongoose.model<VariantDoc, VariantModel>(
  "variants",
  variantSchema
);

export { Variant };
