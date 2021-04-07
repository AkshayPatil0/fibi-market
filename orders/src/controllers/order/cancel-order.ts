import { Request, Response } from "express";
import {
  nats,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@fibimarket/common";

import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../../events/publishers/order-cancelled-publisher";

export const cancelOrderController = async (req: Request, res: Response) => {
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

  new OrderCancelledPublisher(nats.client).publish({
    id: order.id,
    userId: order.userId,
    address: order.address,
    status: order.status,
    price: order.price,
    payment: order.payment,
    product: {
      product: order.product.product.id,
      quantity: order.product.quantity,
    },
    isGroup: order.isGroup,
    orders: order.orders,
  });
  res.status(200).json({});
};
