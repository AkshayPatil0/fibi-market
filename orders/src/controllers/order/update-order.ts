import { Request, Response } from "express";

import { NotFoundError } from "@fibimarket/common";

import { Order } from "../../models/order";
import { updateOrder } from "../../helpers/update-order";

export const updateOrderController = async (req: Request, res: Response) => {
  const { address, price, payment, status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new NotFoundError("order");
  }

  if (order.orders) {
    order.orders.forEach(async (orderId) => {
      const orderItem = await Order.findById(orderId);

      if (!orderItem) {
        return;
      }
      await updateOrder(orderItem, {
        ...JSON.parse(JSON.stringify(orderItem)),
        address: address || orderItem.address,
        payment: payment || orderItem.payment,
        status: status || orderItem.status,
      });
    });
  }
  await updateOrder(order, {
    ...JSON.parse(JSON.stringify(order)),
    address: address || order.address,
    price: price || order.price,
    payment: payment || order.payment,
    status: status || order.status,
  });

  await order.populate("product userId vendor").execPopulate();

  res.status(201).json(order);
};
