import express, { Request, Response } from "express";
import { addToCartController } from "../controllers/cart/add-to-cart";
import { removeFromCartController } from "../controllers/cart/remove-from-cart";

import { Cart } from "../models/cart";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ userId: req.currentUser!.id }).populate({
    path: "products",
    populate: {
      path: "product",
      model: "products",
    },
  });

  res.status(200).json(cart);
});

router.post(
  "/",
  // [
  //   body("productId").not().isEmpty().withMessage("product id is not valid"),
  //   body("quantity").isInt({ gt: 0 }).withMessage("quantity is not valid"),
  // ],
  // validateRequest,
  addToCartController
);

router.post("/remove", removeFromCartController);

export { router as cartRoutes };
