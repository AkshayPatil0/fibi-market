import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@fibimarket/common";
import { Product } from "../../models/product";
import { updateProduct } from "../../helpers/update-product";

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = "service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);
    try {
      if (data.product && data.product.product) {
        const product = await Product.findById(data.product.product);

        if (!product) {
          console.log(`Product with id ${data.product.product} not found`);
          return;
        }

        await updateProduct(product, {
          title: product.title,
          sku: product.sku,
          description: product.description,
          vendor: product.vendor,
          price: product.price,
          specs: product.specs,
          category: product.category,
          location: product.location,
          images: product.images,
          hasVariants: product.hasVariants,
          variants: product.variants,
          stock: product.stock - data.product.quantity,
        });
      }
      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { OrderCreatedListener };
