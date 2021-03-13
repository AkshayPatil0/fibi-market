import express, { Request, Response } from "express";
import { body } from "express-validator";

import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  uploadToAWS,
  validateRequest,
  nats,
} from "@fibimarket/common";

import { Product, ProductAttrs, ProductDoc } from "../models/product";
import { ProductUpdatedPublisher } from "../events/publishers/product-updated-publisher";

import { v1 as uuidv1 } from "uuid";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.put(
  "/api/products/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required !"),

    body("price")
      .not()
      .isEmpty()
      .withMessage("Price is required !")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError("product");
    }

    if (product.vendor !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    const {
      title,
      price,
      stock,
      vendor,
      images,
      category,
      location,
    } = req.body;

    await updateProduct(product, {
      title,
      price,
      stock,
      vendor,
      images,
      category,
      location,
    });

    res.status(200).json(product);
  }
);

router.put(
  "/api/products/:id/images",
  requireAuth,
  upload.array("images", 10),
  async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) throw new NotFoundError("product");

    const files = req.files as Express.Multer.File[];

    const images = await Promise.all(
      files.map(async (file, i) => {
        const fileType = file.originalname.split(".").slice(-1)[0];
        const key = `products/${product.id}/${uuidv1()}.${fileType}`;

        const uri = await uploadToAWS(key, file.buffer);
        return uri;
      })
    );

    product.set("images", images);
    await product.save();

    res.status(200).json(product);
  }
);

function updateProduct(
  product: ProductDoc,
  newProduct: ProductAttrs
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      product.set({
        title: newProduct.title,
        price: newProduct.price,
        stock: newProduct.stock,
        vendor: newProduct.vendor,
      });

      product = await product.save();

      await new ProductUpdatedPublisher(nats.client).publish({
        id: product.id,
        title: product.title,
        price: product.price,
        vendor: product.vendor,
        stock: product.stock,
        version: product.version,
      });

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export { router as updateProductRoute, updateProduct };
