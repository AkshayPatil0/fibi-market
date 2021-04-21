import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  uploadToAWS,
} from "@fibimarket/common";
import { Blog } from "../../models/blog";
import { v1 as uuidv1 } from "uuid";
import { updateBlog } from "../../helpers/update-blog";

export const addBlogImageController = async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid blog id");
  }
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new NotFoundError("blog");
  }

  const files = req.files as Express.Multer.File[];

  const images = await Promise.all(
    files.map(async (file, i) => {
      const fileType = file.originalname.split(".").slice(-1)[0];
      const key = `blogs/${blog.id}/${uuidv1()}.${fileType}`;

      const uri = await uploadToAWS(key, file.buffer);
      return uri;
    })
  );

  await updateBlog(blog, {
    images: [...blog.images, ...images],
    title: blog.title,
    slug: blog.slug,
    description: blog.description,
    body: blog.body,
    author: blog.author,
    relevances: blog.relevances,
  });

  res.status(200).json(blog);
};
