import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { ParsedQs } from "qs";

import { Product, ProductDoc } from "../../models/product";
import { Category } from "../../models/category";

import { getChildrenIds } from "../../helpers";

export const getProductsController = async (req: Request, res: Response) => {
  const {
    category,
    subcategories,
    location,
    locations,
    vendor,
    minPrice,
    maxPrice,
    search,
    sort,
  } = req.query;
  let filterQuery: FilterQuery<ProductDoc> = {};

  console.log(req.query);

  const getChildrenIdsFromArray = async (arr: any[], values: any[]) => {
    let ids: string[] = [];
    for (const value of arr) {
      const doc = await Category.findOne({ slug: value });
      if (doc) {
        ids = [...ids, ...getChildrenIds(values, doc.id), doc.id];
      }
    }
    return ids;
  };

  if (subcategories && Array.isArray(subcategories)) {
    const categories = await Category.find();

    filterQuery.category = {
      $in: await getChildrenIdsFromArray(subcategories, categories),
    };
  } else if (category) {
    const categories = await Category.find();
    const categoryDoc = await Category.findOne({ slug: category.toString() });
    if (categoryDoc) {
      filterQuery.category = {
        $in: [...getChildrenIds(categories, categoryDoc.id), categoryDoc.id],
      };
    }
  }

  if (locations && Array.isArray(locations)) {
    const allLocations = await Category.find({ isLocation: true });
    filterQuery.location = {
      $in: await getChildrenIdsFromArray(locations, allLocations),
    };
  }
  // if (location) {
  //   const locations = await Category.find({ isLocation: true });
  //   const locationDoc = await Category.findById(location);
  //   if (locationDoc) {
  //     filterQuery.location = {
  //       $in: [...getChildrenIds(locations, locationDoc.id), locationDoc.id],
  //     };
  //   }
  // }

  if (vendor) {
    filterQuery.vendor = { $eq: vendor.toString() };
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    filterQuery = {
      ...filterQuery,
      $and: [
        { "price.retail": { $gte: +minPrice } },
        { "price.retail": { $lte: +maxPrice } },
      ],
    };
  }
  // if (maxPrice) {
  //   filterQuery["price.retail"] = { $lte: +maxPrice };
  // }
  if (search) {
    const query = `.*(${search}).*`;
    const re = new RegExp(query);
    filterQuery = {
      $or: [
        { title: { $regex: re, $options: "i" } },
        { description: { $regex: re, $options: "i" } },
      ],
    };
  }

  console.log({ filterQuery });
  const products = await Product.find(filterQuery).sort(sort);

  res.status(200).json(products);
};
