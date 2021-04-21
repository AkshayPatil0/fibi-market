import { Request, Response } from "express";
import mongoose from "mongoose";
import { Category } from "../../models/category";
import { NotFoundError } from "@fibimarket/common";
import { getChildrenTree } from "../../helpers";

export const getCategoryController = async (req: Request, res: Response) => {
  const { location } = req.query;

  let category;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    category = await Category.findById(req.params.id);
  } else {
    category = await Category.findOne({ slug: req.params.id });
  }

  if (!category) {
    return new NotFoundError("category");
  }

  const categories = await Category.find({ isLocation: !!location });

  const categoryTree = {
    ...JSON.parse(JSON.stringify(category)),
    childrens: getChildrenTree(categories, category.id),
  };
  res.status(201).json(categoryTree);
};
