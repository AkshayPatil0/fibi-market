import { Request, Response } from "express";
import { getChildrenTree } from "../../helpers";
import { Category } from "../../models/category";


export const getCategoriesController = async (req: Request, res: Response) => {
  const categories = await Category.find();

  const categoryTree = getChildrenTree(categories);

  res.status(200).json(categoryTree);
}

