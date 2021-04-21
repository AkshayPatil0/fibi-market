import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { Blog, BlogDoc } from "../models/blog";

export async function getBlogsController(req: Request, res: Response) {
  const { search } = req.query;

  const blogs = await Blog.find().populate("author");

  const blogFilter: FilterQuery<BlogDoc> = {};

  if (search) {
    const re = new RegExp(search.toString());
    blogFilter.title = { $regex: re };
  }

  res.status(200).json(blogs);
}
