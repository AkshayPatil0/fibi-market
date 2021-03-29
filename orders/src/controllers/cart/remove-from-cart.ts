import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "@fibimarket/common";
import { Product } from "../../models/product";
import { Cart } from "../../models/cart";

export async function removeFromCartController(req: Request, res: Response) {
  const { productId, quantity, variantId } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    throw new NotFoundError("product");
  }

  const cart = await Cart.findOne({ userId: req.currentUser!.id }).populate({
    path: "products",
    populate: {
      path: "product",
      model: "products",
    },
  });

  if (!cart) {
    const newCart = Cart.build({
      userId: req.currentUser!.id,
      products: [],
      // totalCost: 0,
      // status: OrderStatus.cart
    });

    await newCart.save();
    return res.status(201).json(newCart);
  }

  let products = [];
  products = cart.products.map((val) => {
    if (val.product.id === productId && val.variantId === variantId) {
      if (val.quantity - quantity > 0) {
        return {
          product,
          variantId,
          quantity: val.quantity - quantity,
        };
      }
      return undefined;
    }
    return val;
  });

  cart.set(
    "products",
    products.filter((val) => val)
  );
  // cart.set("totalCost", cart.totalCost - product.price * quantity);

  await cart.save();

  res.status(200).json(cart);
}
