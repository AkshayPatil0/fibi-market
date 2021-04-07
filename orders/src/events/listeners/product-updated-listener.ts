import { Listener, ProductUpdatedEvent, Subjects } from "@fibimarket/common";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/product";

class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;

  queueGroupName = "orders";

  async onMessage(data: ProductUpdatedEvent["data"], msg: Message) {
    try {
      console.log(msg.getSequence(), data);
      const product = await Product.findOne({
        _id: data.id,
        // version: data.version - 1,
      });
      if (!product) {
        throw new Error(
          `Product with id ${data.id} and title ${data.title} not found !`
        );
        return;
      }

      const {
        title,
        price,
        description,
        sku,
        vendor,
        stock,
        specs,
        category,
        location,
        images,
        hasVariants,
        variations,
        variants,
      } = data;
      product.set({
        title,
        price,
        description,
        sku,
        vendor,
        stock,
        specs,
        category,
        location,
        images,
        hasVariants,
        variations,
        variants,
      });

      await product.save();
      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}

export { ProductUpdatedListener };
