import { nats } from "@fibimarket/common";
import { OrderUpdatedPublisher } from "../events/publishers/order-updated-publisher";
import { OrderAttrs, OrderDoc } from "../models/order";

export function updateOrder(
  order: OrderDoc,
  newOrder: OrderAttrs
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      order.set(newOrder);

      await order.save();

      await new OrderUpdatedPublisher(nats.client).publish({
        id: order.id,
        userId: order.user,
        address: order.address,
        status: order.status,
        price: order.price,
        payment: order.payment,
        productId: order.product?.id,
        quantity: order.quantity,
        isGroup: order.isGroup,
        orders: order.orders,
      });

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
