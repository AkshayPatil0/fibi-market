import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "@fibimarket/common";
import { Product } from "../../models/product";
import { Cart } from "../../models/cart";

export async function addToCartController(req: Request, res: Response) {
  const { productId, variantId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    throw new NotFoundError("product");
  }

  if (product.stock < quantity) {
    throw new BadRequestError("Product out of stock");
  }

  const cart = await Cart.findOne({
    userId: req.currentUser!.id,
  }).populate({
    path: "products",
    populate: {
      path: "product",
      model: "products",
    },
  });

  if (!cart) {
    const newCart = Cart.build({
      userId: req.currentUser!.id,
      products: [{ product, variantId, quantity }],
    });

    await newCart.save();
    return res.status(201).json(newCart);
  }
  let products = [];
  let flag = false;

  // console.log({ product, variant, quantity });
  products = cart.products.map((val) => {
    if (val.product.id === product.id && val.variantId === variantId) {
      flag = true;
      return { product, variantId, quantity: val.quantity + +quantity };
    }
    return val;
  });

  if (!flag) {
    cart.set("products", [...products, { product, variantId, quantity }]);
  } else {
    cart.set("products", products);
  }

  // let totalCost = 0;
  // cart.products.map(({ product, quantity }) => {
  //   totalCost += product.price * quantity;
  // });

  // cart.set("totalCost", totalCost);
  await cart.save();
  res.status(201).json(cart);
}
