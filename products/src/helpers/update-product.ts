import { nats } from "@fibimarket/common";
import { ProductUpdatedPublisher } from "../events/publishers/product-updated-publisher";
import { ProductAttrs, ProductDoc } from "../models/product";

export function updateProduct(
  product: ProductDoc,
  newProduct: ProductAttrs
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      product.set(newProduct);

      product = await product.save();

      await new ProductUpdatedPublisher(nats.client).publish({
        id: product.id,
        title: product.title,
        description: product.description,
        sku: product.sku,
        vendor: product.vendor,
        price: product.price,
        specs: product.specs,
        stock: product.stock,
        category: product.category,
        location: product.location,
        images: product.images,
        hasVariants: product.hasVariants,
        variations: product.variations,
        variants: product.variants,
        version: product.version,
      });

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
