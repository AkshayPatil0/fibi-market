import express from "express";
import { Category } from "../../models/category";
import { Location } from "../../models/location";
import { Product } from "../../models/product";

const router = express.Router();

function getCategories(
  categories: any[],
  parent: string | null | undefined = undefined
) {
  const categoryTree: any[] = [];

  let parents = categories.filter((cat) => cat.parent == parent);

  parents.forEach((par) => {
    categoryTree.push({
      id: par.id,
      title: par.title,
      slug: par.slug,
      childrens: getCategories(categories, par.id),
    });
  });

  return categoryTree;
}

router.get("/api/products/categories", async (req, res) => {
  const categories = await Category.find();

  const categoryTree = getCategories(categories);

  res.status(200).json(categoryTree);
});

router.get("/api/products/locations", async (req, res) => {
  const locations = await Location.find();

  const locationTree = getCategories(locations);

  res.status(200).json(locationTree);
});

export { router as getCategoryRoute };
