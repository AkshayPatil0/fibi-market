import { Request, Response } from "express";
import { NotAuthorizedError, NotFoundError } from "@fibimarket/common";
import { Order, OrderDoc } from "../../models/order";

export const getOrderController = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate("products");

  if (!order) {
    throw new NotFoundError("order");
  }

  if (order.user !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  res.status(200).json(order);
};
