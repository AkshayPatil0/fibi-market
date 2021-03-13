import { Listener, ProductDeletedEvent, Subjects } from "@fibimarket/common";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/product";

class ProductDeletedListener extends Listener<ProductDeletedEvent> {
  subject: Subjects.ProductDeleted = Subjects.ProductDeleted;

  queueGroupName = "orders";

  async onMessage(data: ProductDeletedEvent["data"], msg: Message) {
    try {
      const product = await Product.findById(data.id);
      console.log(msg.getSequence(), data);
      if (!product) {
        return;
      }
      await product.delete();
      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { ProductDeletedListener };
