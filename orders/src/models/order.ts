import { OrderStatus } from "@fibimarket/common";
import mongoose from "mongoose";
import { ProductDoc } from "./product";

export interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  price: { mrp: number; retail: number };
  address?: {
    name: string;
    phone: string;
    address: string;
    locality: string;
    pincode: string;
    city: string;
    state: string;
  };
  payment?: {
    method: string;
    transactionId?: string;
  };
  product?: string;
  quantity?: number;
  isGroup?: boolean;
  orders?: any[];
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

export interface OrderDoc extends mongoose.Document {
  userId: string;
  address: {
    name: string;
    phone: string;
    address: string;
    locality: string;
    pincode: string;
    city: string;
    state: string;
  };
  status: OrderStatus;
  price: { mrp: number; retail: number };
  payment: {
    method: string;
    transactionId: string;
  };
  product: ProductDoc;
  quantity: number;
  isGroup: boolean;
  orders: any[];
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    address: {},
    status: {
      type: String,
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
    product: {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
    quantity: Number,
    payment: {
      method: String,
      transactionId: String,
    },
    isGroup: Boolean,
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "orders",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("orders", orderSchema);

export { Order };
