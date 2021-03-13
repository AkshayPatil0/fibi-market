import { Listener, ProductUpdatedEvent, Subjects } from "@fibimarket/common";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/product";

class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;

  queueGroupName = "orders";

  async onMessage(data: ProductUpdatedEvent["data"], msg: Message) {
    try {
      const product = await Product.findById(data.id);
      console.log(msg.getSequence(), data);
      if (!product) return;

      product.set({
        title: data.title,
        price: data.price,
        stock: data.stock,
        vendor: data.vendor,
      });

      await product.save();
      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { ProductUpdatedListener };
