import { NotFoundError } from "@fibimarket/common";
import { Request, Response } from "express";
import { Blog } from "../models/blog";

export async function deleteBlogController(req: Request, res: Response) {
  const blog = await Blog.findById(req.params.id).populate("author");

  if (!blog) {
    throw new NotFoundError("blog");
  }

  await blog.delete();
  res.status(200).json({});
}
