import { Message } from "node-nats-streaming";
import { Listener, OrderCancelledEvent, Subjects } from "@fibimarket/common";
import { Product } from "../../models/product";
import { updateProduct } from "../../helpers";

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

        // await updateProduct(product, {
        //   title: product.title,
        //   description: product.description,
        //   vendor: product.vendor,
        //   price: product.price,
        //   specs: product.specs,
        //   category: product.category,
        //   location: product.location,
        //   images: product.images,
        //   hasVariants: product.hasVariants,
        //   variants: product.variants,
        //   stock: product.stock + val.quantity,
        // });
      });
      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { OrderCancelledListener };
