import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  BadRequestError,
  deleteFromAWS,
  NotFoundError,
} from "@fibimarket/common";
import fs from "fs";
import { Blog } from "../../models/blog";
import { updateBlog } from "../../helpers/update-blog";

export const removeBlogImageController = async (
  req: Request,
  res: Response
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid blog id");
  }
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new NotFoundError("blog");
  }

  if (!req.body.uri) {
    throw new BadRequestError("Invalid image uri");
  }
  // const key = req.body.uri.split(".com/").slice(-1)[0];

  // await deleteFromAWS(key);

  // await new Promise<void>((resolve, reject) => {
  //   const filename = req.body.uri.split("/").slice(-1)[0];
  //   fs.unlink(`uploads/blogs/${filename}`, (err) => {
  //     if (err) {
  //       reject(err);
  //     }
  //     resolve();
  //   });
  // });

  await updateBlog(blog, {
    images: blog.images.filter((uri: string) => uri !== req.body.uri),
    title: blog.title,
    slug: blog.slug,
    description: blog.description,
    body: blog.body,
    author: blog.author,
    relevances: blog.relevances,
  });

  res.status(200).json(blog);
};
