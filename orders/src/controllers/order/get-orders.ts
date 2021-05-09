import { Request, Response } from "express";
import { OrderStatus } from "@fibimarket/common";
import { Order, OrderDoc } from "../../models/order";
import mongoose, { FilterQuery } from "mongoose";

export const getOrdersController = async (req: Request, res: Response) => {
  const { user, status, vendor } = req.query;
  var orderFilter: FilterQuery<OrderDoc> = {};

  if (user) {
    orderFilter.userId = { $eq: user.toString() };
  }

  if (status && Object.values(OrderStatus).includes(<any>status)) {
    orderFilter.status = { $eq: (<any>OrderStatus)[status.toString()] };
  }

  const orders = await Order.find(orderFilter).populate("user product vendor");

  res.status(200).json(orders);
};
