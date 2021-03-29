import { Request, Response } from "express";
import mongoose from "mongoose";
import { Category } from "../../models/category";
import slugify from "slugify";
import { BadRequestError, NotFoundError } from "@fibimarket/common";

export const createCategoryController = async (req: Request, res: Response) => {
  const { title, parent } = req.body;

  let parentDoc;
  let slug = "";
  if (parent) {
    if (!mongoose.Types.ObjectId.isValid(parent))
      throw new BadRequestError("Parent is not valid");

    parentDoc = await Category.findById(parent);

    if (!parentDoc) throw new NotFoundError("Parent");

    slug = slugify(`${parentDoc.title}-${title}`);
  } else {
    slug = slugify(title);
  }

  const category = Category.build({
    title,
    parent: parentDoc?.id,
    slug,
  });

  await category.save();

  res.status(201).json(category);
};
