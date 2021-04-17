import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  uploadToAWS,
} from "@fibimarket/common";
import { Product } from "../../../models/product";
import { v1 as uuidv1 } from "uuid";
import { updateProduct } from "../../../helpers/update-product";

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

  await updateProduct(product, {
    images: [...product.images, ...images],
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
