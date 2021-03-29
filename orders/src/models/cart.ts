import mongoose from "mongoose";
import { ProductDoc } from "./product";

interface CartAttrs {
  userId: string;
  // totalCost: number,
  products: {
    product: ProductDoc;
    variantId?: string;
    quantity: number;
  }[];
}

interface CartModel extends mongoose.Model<CartDoc> {
  build(attrs: CartAttrs): CartDoc;
}

export interface CartDoc extends mongoose.Document {
  userId: string;
  products: {
    product: ProductDoc;
    variantId?: string;
    quantity: number;
  }[];
}

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    // totalCost: {
    // 	type: Number
    // },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "products",
          required: true,
        },
        variantId: String,
        quantity: { type: Number, default: 1 },
      },
    ],
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

cartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>("carts", cartSchema);

export { Cart };
