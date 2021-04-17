import { nats } from "@fibimarket/common";
import { Request, Response } from "express";
import mongoose from "mongoose";
import slugify from "slugify";
import { ProductCreatedPublisher } from "../../events/publishers/product-created-publisher";
import { Product } from "../../models/product";

export const createProductController = async (req: Request, res: Response) => {
  const {
    title,
    sku,
    description,
    price,
    stock,
    category,
    location,
    hasVariants,
    variations,
    variants,
  } = req.body;

  const product = Product.build({
    title,
    sku,
    description,
    price,
    stock,
    category,
    location,
    vendor: req.currentUser!.id,
    hasVariants: hasVariants || false,
    // variations: Object.fromEntries(variations.map((v: any) => [slugify(v.title), v])),
    variations: variations,
    variants: variants,
  });

  await product.save();

  new ProductCreatedPublisher(nats.client).publish({
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

  res.status(201).json(product);
};
