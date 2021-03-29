import { Message } from "node-nats-streaming";
import { Listener, ProductCreatedEvent, Subjects } from "@fibimarket/common";
import { Product } from "../../models/product";

class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = "service";

  async onMessage(data: ProductCreatedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);
    try {
      const product = await Product.build({
        _id: data.id,
        title: data.title,
        description: data.description,
        sku: data.sku,
        price: data.price,
        vendor: data.vendor,
        stock: data.stock,
      });

      await product.save();

      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { ProductCreatedListener };
