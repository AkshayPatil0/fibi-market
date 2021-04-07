import { Request, Response } from "express";

import { NotFoundError } from "@fibimarket/common";

import { Order } from "../../models/order";
import { updateOrder } from "../../helpers/update-order";

export const updateOrderController = async (req: Request, res: Response) => {
  const { address, price, payment } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new NotFoundError("order");
  }

  updateOrder(order, {
    userId: order.userId,
    address: address || order.address,
    status: order.status,
    price: price || order.price,
    payment: payment || order.payment,
    product: {
      product: order.product.product?.id,
      quantity: order.product?.quantity,
    },
    isGroup: order.isGroup,
    orders: order.orders,
  });
  await order.save();

  res.status(201).json(order);
};
