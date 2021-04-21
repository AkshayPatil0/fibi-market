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

export const addBlogCoverController = async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid blog id !");
  }
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new NotFoundError("blog");
  }

  if (!req.file) {
    throw new BadRequestError("Invalid blog cover !");
  }

  const fileType = req.file.originalname.split(".").slice(-1)[0];
  const key = `blogs/${blog.id}/${uuidv1()}.${fileType}`;

  const cover = await uploadToAWS(key, req.file.buffer);

  await updateBlog(blog, {
    cover,
    images: blog.images,
    title: blog.title,
    slug: blog.slug,
    description: blog.description,
    body: blog.body,
    author: blog.author,
    relevances: blog.relevances,
  });

  res.status(200).json(blog);
};
