import express from "express";
import { Category } from "../../models/category";
import { Location } from "../../models/location";
import slugify from "slugify";

const router = express.Router();

router.post("/api/products/categories", async (req, res) => {
  const { title, parent } = req.body;

  const slug = slugify(title);
  const category = Category.build({
    title,
    parent,
    slug,
  });

  await category.save();

  res.status(201).json(category);
});

router.post("/api/products/locations", async (req, res) => {
  const { title, parent } = req.body;
  const slug = slugify(title);
  const location = Location.build({
    title,
    parent,
    slug,
  });

  await location.save();

  res.status(201).json(location);
});

export { router as newCategoryRoute };
