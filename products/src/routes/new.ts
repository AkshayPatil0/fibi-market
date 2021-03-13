import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  requireAuth,
  authRole,
  UserRoles,
  nats,
} from "@fibimarket/common";
import { Product } from "../models/product";
import { ProductCreatedPublisher } from "../events/publishers/product-created-publisher";

const router = express.Router();

router.post(
  "/api/products",
  requireAuth,
  authRole(UserRoles.vendor),
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
    const { title, price, stock, category, location } = req.body;

    const product = Product.build({
      title,
      price,
      stock,
      vendor: req.currentUser!.id,
      category,
      location,
      images: [],
    });

    await product.save();

    new ProductCreatedPublisher(nats.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      vendor: product.vendor,
      stock: product.stock,
      version: product.version,
    });

    res.status(201).json(product);
  }
);

export { router as newProductRoute };
