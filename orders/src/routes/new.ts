import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  ProductOutOfStockError,
  RequestValidationError,
  nats,
} from "@fibimarket/common";

import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";

const router = express.Router();

router.post("/api/orders", async (req: Request, res: Response) => {
  const order = await Order.findOne({
    userId: req.currentUser!.id,
    status: OrderStatus.cart,
  }).populate({
    path: "products",
    populate: {
      path: "product",
      model: "products",
    },
  });

  if (!order) {
    throw new NotFoundError("cart");
  }
  let outOfStockProducts: { id: string; stock: number }[] = [];
  order.products.map((val) => {
    if (val.product.stock < val.quantity) {
      outOfStockProducts.push({ id: val.product.id, stock: val.product.stock });
    }
  });

  if (outOfStockProducts.length > 0) {
    throw new ProductOutOfStockError(outOfStockProducts);
  }

  order.set("status", OrderStatus.created);

  await order.save();

  new OrderCreatedPublisher(nats.client).publish({
    id: order.id,
    products: order.products.map((val) => ({
      id: val.product.id,
      quantity: val.quantity,
    })),
    userId: req.currentUser!.id,
  });

  res.status(201).json(order);
});

export { router as newOrderRoute };
