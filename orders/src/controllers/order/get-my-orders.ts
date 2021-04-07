import { Request, Response } from "express";

import { Order } from "../../models/order";

export const getMyOrdersController = async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
    isGroup: true,
  })
    .populate("orders")
    .populate({
      path: "orders",
      populate: {
        path: "product",
        model: "products",
      },
    });

  res.status(200).json(orders);
};
