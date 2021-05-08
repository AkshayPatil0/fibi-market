import { Request, Response } from "express";
import { NotAuthorizedError, NotFoundError } from "@fibimarket/common";
import { Product, ProductDoc } from "../../models/product";
import { updateProduct } from "../../helpers/update-product";

export const publishProductController = async (req: Request, res: Response) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError("product");
  }

  await updateProduct(product, {
    ...JSON.parse(JSON.stringify(product)),
    ifPublish: !product.ifPublish,
  });

  res.status(200).json(product);
};
