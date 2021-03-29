import { Request, Response } from "express";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "@fibimarket/common";
import { Product } from "../../../models/product";
import { Variant } from "../../../models/variant";

export const removeProductVariantController = async (
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

  if (!mongoose.Types.ObjectId.isValid(req.body.variantId)) {
    throw new BadRequestError("Invalid variant id");
  }

  await Variant.findByIdAndDelete(req.body.variantId);

  product.set(
    "variants",
    product.variants.filter((vId) => vId != req.body.variantId)
  );
  await product.save();

  res.status(200).json(product);
};
