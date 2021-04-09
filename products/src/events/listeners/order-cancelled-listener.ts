import { Message } from "node-nats-streaming";
import { Listener, OrderCancelledEvent, Subjects } from "@fibimarket/common";
import { Product } from "../../models/product";
import { updateProduct } from "../../helpers/update-product";

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = "service";

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);
    try {
      if (data.productId) {
        const product = await Product.findById(data.productId);

        if (!product) {
          console.log(`Product with id ${data.productId} not found`);
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
          stock: product.stock + data.quantity!,
        });
      }
      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { OrderCancelledListener };
