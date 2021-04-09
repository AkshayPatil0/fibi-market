import { Request, Response } from "express";

import { NotFoundError } from "@fibimarket/common";

import { Order } from "../../models/order";
import { updateOrder } from "../../helpers/update-order";

export const updateOrderController = async (req: Request, res: Response) => {
  const { address, price, payment, status } = req.body;

  const order = await Order.findById(req.params.id)
    .populate({
      path: "product",
      populate: {
        path: "product",
        model: "products",
      },
    })
    .populate("orders");

  if (!order) {
    throw new NotFoundError("order");
  }

  await updateOrder(order, {
    userId: order.userId,
    address: address || order.address,
    status: status || order.status,
    price: price || order.price,
    payment: payment || order.payment,
    product: order.product?.id,
    quantity: order.quantity,
    isGroup: order.isGroup,
    orders: order.orders,
  });

  res.status(201).json(order);
};
