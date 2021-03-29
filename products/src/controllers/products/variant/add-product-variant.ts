import { Request, Response } from "express";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "@fibimarket/common";
import { Product } from "../../../models/product";
import { Variant } from "../../../models/variant";

export const addProductVariantController = async (
  req: Request,
  res: Response
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid product id");
  }
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError("product");
  }

  const variant = Variant.build({});
  await variant.save();

  product.set("variants", [...product.variants, variant.id]);
  await product.save();

  res.status(200).json(product);
};
