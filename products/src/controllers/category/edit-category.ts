import { Request, Response } from "express";
import { Category } from "../../models/category";
import { NotFoundError, uploadToAWS } from "@fibimarket/common";

export const editCategoryController = async (req: Request, res: Response) => {
  const {
    title,
    minPrice,
    maxPrice,
    location,
    image,
    blog,
    description,
  } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    return new NotFoundError("category");
  }

  let newImage = image;
  if (req.file) {
    const fileType = req.file.originalname.split(".").slice(-1)[0];
    const key = `categories/${category.id}.${fileType}`;

    newImage = await uploadToAWS(key, req.file.buffer);
  }

  category.set({
    ...JSON.parse(JSON.stringify(category)),
    title,
    image: newImage,
    minPrice,
    maxPrice,
    blog,
    description,
  });

  await category.save();

  res.status(201).json(category);
};
