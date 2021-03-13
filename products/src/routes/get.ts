import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@fibimarket/common";

import { Product, ProductDoc } from "../models/product";
import { Category } from "../models/category";
import { FilterQuery } from "mongoose";
import { Location } from "../models/location";

const router = express.Router();

function getChildren(
  categories: any[],
  parent: string | null | undefined = undefined
): Array<string> {
  let categoryIds: string[] = [];

  if (!parent) {
    return [];
  }
  let childs = categories.filter((cat) => cat.parent == parent);
  
  childs.forEach((child) => {
    categoryIds = [
      ...categoryIds,
      child.id,
      ...getChildren(categories, child.id),
    ];
  });

  return categoryIds;
}

router.get("/api/products", async (req: Request, res: Response) => {
  const { category, location, vendor } = req.query;
  let filterQuery: FilterQuery<ProductDoc> = {};

  console.log(req.query);
  if (category) {
    const categories = await Category.find();
    const categoryDoc = await Category.findById(category);
    if (categoryDoc) {
      const categoryIds = [...getChildren(categories, categoryDoc.id), categoryDoc.id];
      filterQuery.category = { $in: categoryIds };
    }
  }

  if (location){
    const locations = await Location.find();
    const locationDoc = await Location.findById(location);
    if (locationDoc) {
      const locationIds = [...getChildren(locations, locationDoc.id), locationDoc.id];
      filterQuery.location = { $in: locationIds };
    }
  }

  if (vendor) {
    filterQuery.vendor = {$eq: vendor.toString()}
  }

  const products = await Product.find(filterQuery);

  res.status(200).json(products);
});

router.get(
  "/api/products/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError("product");
    }

    res.status(200).json(product);
  }
);

export { router as getRoute };
