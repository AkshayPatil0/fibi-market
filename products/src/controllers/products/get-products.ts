import { Request, Response } from "express";
import { FilterQuery } from "mongoose";

import { Product, ProductDoc } from "../../models/product";
import { Category } from "../../models/category";

import { getChildrenIds } from "../../helpers";

export const getProductsController = async (req: Request, res: Response) => {
  const { category, location, vendor, minPrice, maxPrice } = req.query;
  let filterQuery: FilterQuery<ProductDoc> = {};

  console.log(req.query);
  if (category) {
    const categories = await Category.find();
    const categoryDoc = await Category.findById(category);
    if (categoryDoc) {
      const categoryIds = [
        ...getChildrenIds(categories, categoryDoc.id),
        categoryDoc.id,
      ];
      filterQuery.category = { $in: categoryIds };
    }
  }

  if (location) {
    const locations = await Category.find({ isLocation: true });
    const locationDoc = await Category.findById(location);
    if (locationDoc) {
      const locationIds = [
        ...getChildrenIds(locations, locationDoc.id),
        locationDoc.id,
      ];
      filterQuery.location = { $in: locationIds };
    }
  }

  if (vendor) {
    filterQuery.vendor = { $eq: vendor.toString() };
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    filterQuery = {
      $and: [
        { "price.retail": { $gte: +minPrice } },
        { "price.retail": { $lte: +maxPrice } },
      ],
    };
  }
  // if (maxPrice) {
  //   filterQuery["price.retail"] = { $lte: +maxPrice };
  // }

  const products = await Product.find(filterQuery);

  res.status(200).json(products);
};
