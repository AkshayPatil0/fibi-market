import { Request, Response } from "express";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "@fibimarket/common";
import { Product } from "../../../models/product";
import { Variant } from "../../../models/variant";

export const getProductVariantController = async (
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
  if (!mongoose.Types.ObjectId.isValid(req.params.variantId)) {
    throw new BadRequestError("Invalid variant id");
  }
  const variant = await Variant.findById(req.params.variantId);

  res.status(200).json(variant);
};
