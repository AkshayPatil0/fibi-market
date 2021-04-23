import { Request, Response } from "express";
import { Blog } from "../../models/blog";
import slugify from "slugify";

export async function createBlogController(req: Request, res: Response) {
  const { title, description, body } = req.body;

  const blog = Blog.build({
    title,
    description,
    body,
    slug: slugify(title, { strict: true, lower: true }),
    author: req.currentUser?.id!,
  });

  console.log({ blog });

  await blog.save();

  res.status(201).json(blog);
}
