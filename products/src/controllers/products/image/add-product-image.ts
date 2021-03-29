import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  uploadToAWS,
} from "@fibimarket/common";
import { Product } from "../../../models/product";
import { v1 as uuidv1 } from "uuid";

export const addProductImageController = async (
  req: Request,
  res: Response
) => {
  // if (!req.file) {
  //   throw new BadRequestError("Image is not provided !");
  // }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid product id");
  }
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError("product");
  }

  const files = req.files as Express.Multer.File[];

  const images = await Promise.all(
    files.map(async (file, i) => {
      const fileType = file.originalname.split(".").slice(-1)[0];
      const key = `products/${product.id}/${uuidv1()}.${fileType}`;

      const uri = await uploadToAWS(key, file.buffer);
      return uri;
    })
  );
  product.set("images", [...product.images, ...images]);
  await product.save();

  res.status(200).json(product);
};
