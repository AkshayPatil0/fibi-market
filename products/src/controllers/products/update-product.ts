import { Request, Response } from "express";
import { NotAuthorizedError, NotFoundError } from "@fibimarket/common";
import { Product, ProductDoc } from "../../models/product";
import { updateProduct } from "../../helpers/update-product";

export const updateProductController = async (req: Request, res: Response) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError("product");
  }

  if (product.vendor.toString() !== req.currentUser?.id) {
    throw new NotAuthorizedError();
  }

  const {
    title,
    sku,
    description,
    price,
    specs,
    stock,
    images,
    category,
    variations,
    variants,
    location,
  } = req.body;

  type ProductVariant = ProductDoc["variants"][0];

  let newVariants = new Array<ProductVariant>();

  if (variants) {
    variants.map((variant: ProductVariant) => {
      if (variant.id) {
        newVariants.push(variant);
      } else {
        const id = Object.values(variant.variation).sort().join("_");
        newVariants.push({ ...variant, id });
      }
    });
  }

  await updateProduct(product, {
    title: title || product.title,
    sku: sku || product.sku,
    description: description || product.description,
    price: price || product.price,
    specs: specs || product.specs,
    stock: stock || product.stock,
    vendor: product.vendor,
    images: images || product.images,
    category: category || product.category,
    location: location || product.location,
    hasVariants: newVariants.length > 0,
    variations: variations || product.variations,
    variants: newVariants,
  });

  res.status(200).json(product);
};
