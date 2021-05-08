import { Request, Response } from "express";
import { Blog } from "../../models/blog";
import slugify from "slugify";
import { NotFoundError } from "@fibimarket/common";

export async function updateBlogController(req: Request, res: Response) {
  const { title, description, body, relevances } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new NotFoundError("blog");
  }

  blog.set({
    title,
    description,
    body,
    slug: slugify(title, { strict: true, lower: true }),
    relevances,
  });

  await blog.save();

  res.status(201).json(blog);
}
 