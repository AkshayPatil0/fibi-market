import { Request, Response } from "express";
import { Category } from "../../models/category";
import { NotFoundError } from "@fibimarket/common";

export const editCategoryController = async (req: Request, res: Response) => {
  const { title, minPrice, maxPrice, location } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    return new NotFoundError("category");
  }

  category.set({
    ...category._doc,
    title,
    minPrice,
    maxPrice,
  });

  await category.save();

  res.status(201).json(category);
};
