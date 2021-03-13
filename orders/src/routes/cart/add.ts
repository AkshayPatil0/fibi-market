import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  validateRequest,
} from "@fibimarket/common";
import { Product } from "../../models/product";
import { Order } from "../../models/order";
const router = express.Router();

router.post(
  "/api/orders/cart",
  [
    body("productId").not().isEmpty().withMessage("product id is not valid"),
    body("quantity").isInt({ gt: 0 }).withMessage("quantity is not valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      throw new NotFoundError("product");
    }

    if (product.stock < quantity) {
      throw new BadRequestError("Product out of stock");
    }

    const cart = await Order.findOne({
      userId: req.currentUser!.id,
      status: OrderStatus.cart,
    }).populate({
      path: "products",
      populate: {
        path: "product",
        model: "products",
      },
    });

    if (!cart) {
      const newOrder = Order.build({
        userId: req.currentUser!.id,
        products: [{ product, quantity }],
        totalCost: product.price * quantity,
        status: OrderStatus.cart,
      });

      await newOrder.save();
      return res.status(201).json(newOrder);
    }
    let products = [];
    let flag = false;
    products = cart.products.map((val) => {
      if (val.product.id === product.id) {
        flag = true;
        return { product, quantity: val.quantity + +quantity };
      }
      return val;
    });
    console.log(products);
    if (!flag) {
      cart.set("products", [...products, { product, quantity }]);
    } else {
      cart.set("products", products);
    }
    cart.set("totalCost", cart.totalCost + product.price * quantity);
    await cart.save();
    res.status(201).json(cart);
  }
);

export { router as addToCartRoute };
