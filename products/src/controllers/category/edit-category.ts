import { Request, Response } from "express";
import { Category } from "../../models/category";
import { NotFoundError, uploadToAWS } from "@fibimarket/common";
import fs from "fs";

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
  // if (category.image) {
  //   await new Promise<void>((resolve, reject) => {
  //     const filename = category.image.split("/").slice(-1)[0];
  //     fs.unlink(`uploads/categories/${filename}`, (err) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve();
  //     });
  //   });
  // }
  if (req.file) {
    // const fileType = req.file.originalname.split(".").slice(-1)[0];
    // const key = `categories/${category.id}.${fileType}`;

    // newImage = await uploadToAWS(key, req.file.buffer);
    newImage = "/api/products/" + req.file.path;
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
