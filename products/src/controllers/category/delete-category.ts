import { Request, Response } from "express";
import { NotFoundError } from "@fibimarket/common";
import { deleteChildren } from "../../helpers";
import { Category } from "../../models/category";

export const deleteCategoryController = async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) throw new NotFoundError("category");

  const categories = await Category.find();

  await deleteChildren(categories, category.id);

  await category.delete();

  res.send({});
}
