import { NotFoundError } from "@fibimarket/common";
import { Request, Response } from "express";
import { Blog } from "../models/blog";

export async function getBlogController(req: Request, res: Response) {
  const blog = await Blog.findOne({ slug: req.params.slug }).populate("author");

  if (!blog) {
    throw new NotFoundError("blog");
  }
  res.status(200).json(blog);
}
