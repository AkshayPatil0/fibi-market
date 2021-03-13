import { NotFoundError } from "@fibimarket/common";
import express from "express";
import { Category } from "../../models/category";
import { Location } from "../../models/location";

const router = express.Router();

async function deleteCategories(
  categories: any[],
  parent: string | null | undefined = undefined
) {
  let childs = categories.filter((cat) => cat.parent == parent);

  await Promise.all(
    childs.map(async (child) => {
      await deleteCategories(categories, child.id);
      await child.delete();
    })
  );
}

router.delete("/api/products/categories/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) throw new NotFoundError("category");

  const categories = await Category.find();

  await deleteCategories(categories, category.id);

  await category.delete();

  res.send({});
});

router.delete("/api/products/locations/:id", async (req, res) => {
  const location = await Category.findById(req.params.id);

  if (!location) throw new NotFoundError("location");

  const locations = await Location.find();

  await deleteCategories(locations, location.id);

  await location.delete();

  res.send({});
});

export { router as deleteCategoryRoute };
