import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  uploadToAWS,
} from "@fibimarket/common";
import { Blog } from "../../models/blog";
import fs from "fs"; 
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

  // if(blog.cover){
  //   await new Promise<void>((resolve, reject) => {
  //     const filename = blog.cover.split("/").slice(-1)[0]
  //     fs.unlink(`uploads/users/${filename}`, (err) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve();
  //     });
  //   });
  // }
  // const fileType = req.file.originalname.split(".").slice(-1)[0];
  // const key = `blogs/${blog.id}/${uuidv1()}.${fileType}`;

  // const cover = await uploadToAWS(key, req.file.buffer);
  const cover = "/api/blogs/" + req.file.path;

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
