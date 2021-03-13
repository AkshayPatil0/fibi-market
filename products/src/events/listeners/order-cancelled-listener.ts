import { Message } from "node-nats-streaming";
import { Listener, OrderCancelledEvent, Subjects } from "@fibimarket/common";
import { Product } from "../../models/product";
import { updateProduct } from "../../routes/update";

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = "service";

  onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    console.log(msg.getSequence(), data);
    try {
      let product;
      data.products.map(async (val) => {
        product = await Product.findById(val.id);

        if (!product) return;

        await updateProduct(product, {
          title: product.title,
          price: product.price,
          vendor: product.vendor,
          stock: product.stock + val.quantity,
          images: product.images,
          category: product.category,
          location: product.location,
        });
      });
      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { OrderCancelledListener };
