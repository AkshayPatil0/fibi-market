import { Request, Response } from "express";

import { NotFoundError } from "@fibimarket/common";

import { Order } from "../../models/order";
import { updateOrder } from "../../helpers/update-order";

export const updateOrderStatusController = async (
  req: Request,
  res: Response
) => {
  const { address, status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new NotFoundError("order");
  }

  // order.orders.forEach(async (orderId) => {
  //   const orderItem = await Order.findById(orderId);

  //   if (!orderItem) {
  //     return;
  //   }
  //   await updateOrder(orderItem, {
  //     ...JSON.parse(JSON.stringify(orderItem)),
  //     address: address || orderItem.address,
  //     payment: payment || orderItem.payment,
  //   });
  // });
  await updateOrder(order, {
    ...JSON.parse(JSON.stringify(order)),
    status: status || order.status,
  });

  await order.populate("product").execPopulate();
  res.status(201).json(order);
};
