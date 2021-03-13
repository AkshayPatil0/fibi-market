import express from "express";
import { Category } from "../../models/category";
import { Location } from "../../models/location";
import { Product } from "../../models/product";

const router = express.Router();

function getCategories(
  categories: any[],
  parent: string | null | undefined = undefined
): Array<string> {
  let categoryIds: string[] = [];

  let parents = categories.filter((cat) => cat.parent == parent);

  parents.forEach((par) => {
    categoryIds = [
      ...categoryIds,
      par.id,
      ...getCategories(categories, par.id),
    ];
  });

  return categoryIds;
}

router.get("/api/products/categories/:id", async (req, res) => {
  const categories = await Category.find();
  const category = await Category.findById(req.params.id);
  const categoryIds = getCategories(categories, category?.parent);
  const products = await Product.find({ category: { $in: categoryIds } });

  res.status(200).json(products);
});

router.get("/api/products/locations/:id", async (req, res) => {
  const locations = await Location.find();
  const location = await Location.findById(req.params.id);
  const locationIds = getCategories(locations, location?.id);
  const products = await Product.find({ location: { $in: locationIds } });

  res.status(200).json(products);
});

export { router as getCategoryRoute };
