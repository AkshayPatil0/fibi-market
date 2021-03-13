import express, { Request, Response } from "express";
import {
  nats,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@fibimarket/common";

import { Order } from "../models/order";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";

const router = express.Router();

router.delete(
  "/api/orders/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate({
      path: "products",
      populate: {
        path: "product",
        model: "products",
      },
    });

    if (!order) {
      throw new NotFoundError("order");
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.cancelled) {
      await order.delete();
      return res.status(200).json({});
    }
    order.set("status", OrderStatus.cancelled);
    await order.save();
    console.log(order.products);
    new OrderCancelledPublisher(nats.client).publish({
      id: order.id,
      products: order.products.map((val) => ({
        id: val.product.id,
        quantity: val.quantity,
      })),
      userId: order.userId,
    });
    res.status(200).json({});
  }
);

export { router as cancelOrderRoute };
