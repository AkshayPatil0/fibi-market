import { Request, Response } from "express";
import { Category } from "../../models/category";
import { NotFoundError } from "@fibimarket/common";
import { getChildrenTree } from "../../helpers";

export const getCategoryController = async (req: Request, res: Response) => {
  const { location } = req.query;
  const category = await Category.findById(req.params.id);

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
