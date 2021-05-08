import {
  deleteFolderFromAWS,
  nats,
  NotAuthorizedError,
  NotFoundError,
} from "@fibimarket/common";
import { Request, Response } from "express";
import { ProductDeletedPublisher } from "../../events/publishers/product-deleted-publisher";
import { Product } from "../../models/product";
import fs from "fs";

export const deleteProductController = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) throw new NotFoundError("product");

  console.log(product.vendor, req.currentUser?.id);
  if (product.vendor.toString() !== req.currentUser?.id)
    throw new NotAuthorizedError();

  await Promise.all(
    product.images.map(
      (img) =>
        new Promise<void>((resolve, reject) => {
          const filename = img.split("/").slice(-1)[0];
          fs.unlink(`uploads/products/${filename}`, (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          });
        })
    )
  );
  await product.delete();

  // deleteFolderFromAWS(`products/${product.id}`)
  // 	.then(() => {
  // 		console.log("images deleted succesfully !");
  // 	})
  // 	.catch((err) => {
  // 		console.error(err);
  // 	});

  await new ProductDeletedPublisher(nats.client).publish({
    id: product.id,
    version: product.version,
  });

  res.status(200).json({});
};
