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

  product.set(
    "images",
    product.images.filter((uri) => uri !== req.body.uri)
  );
  await product.save();

  res.status(200).json(product);
};
