import { OrderStatus } from "@fibimarket/common";
import mongoose from "mongoose";
import { ProductDoc } from "./product";

export interface OrderAttrs {
  user: string;
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
  vendor?: string;
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
  user: string;
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
  vendor: string;
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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
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
    vendor: { type: mongoose.Types.ObjectId, ref: "vendors" },
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
