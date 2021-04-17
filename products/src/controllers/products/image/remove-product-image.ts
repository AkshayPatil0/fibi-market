import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  BadRequestError,
  deleteFromAWS,
  NotFoundError,
  uploadToAWS,
} from "@fibimarket/common";
import { Product } from "../../../models/product";
import { v1 as uuidv1 } from "uuid";
import { updateProduct } from "../../../helpers/update-product";

export const removeProductImageController = async (
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

  if (!req.body.uri) {
    throw new BadRequestError("Invalid image uri");
  }
  const key = req.body.uri.split(".com/").slice(-1)[0];

  await deleteFromAWS(key);

  await updateProduct(product, {
    images: product.images.filter((uri) => uri !== req.body.uri),
    title: product.title,
    description: product.description,
    price: product.price,
    sku: product.sku,
    vendor: product.vendor,
    category: product.category,
    location: product.location,
    specs: product.specs,
    stock: product.stock,
    hasVariants: product.hasVariants,
    variants: product.variants,
    variations: product.variations,
  });

  res.status(200).json(product);
};
