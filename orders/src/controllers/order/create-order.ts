import { Request, Response } from "express";

import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  ProductOutOfStockError,
  RequestValidationError,
  nats,
} from "@fibimarket/common";

import { Order, OrderAttrs } from "../../models/order";

import { OrderCreatedPublisher } from "../../events/publishers/order-created-publisher";
import { Product } from "../../models/product";

export const createOrderController = async (req: Request, res: Response) => {
  const { address, price, productId, quantity, orders } = req.body;

  let orderAttrs: OrderAttrs = {
    userId: req.currentUser?.id!,
    price,
    status: OrderStatus.created,
  };

  let product;
  if (productId && quantity) {
    product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError("product");
    }
    orderAttrs.product = { product: product.id, quantity };
  }

  if (orders) {
    orderAttrs.isGroup = true;
    orderAttrs.orders = orders;
  }

  if (address) {
    orderAttrs.address = address;
  }

  const order = Order.build(orderAttrs);

  await order.save();
  await order
    .populate({
      path: "product",
      populate: {
        path: "product",
        model: "products",
      },
    })
    .execPopulate();

  // console.log(order.);

  new OrderCreatedPublisher(nats.client).publish({
    id: order.id,
    userId: req.currentUser!.id,
    address: order.address,
    status: order.status,
    price: order.price,
    payment: order.payment,
    product: {
      product: product?.id,
      quantity: order.product?.quantity,
    },
    isGroup: order.isGroup,
    orders: order.orders,
  });

  res.status(201).json({ ...order });
};
