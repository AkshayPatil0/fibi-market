import { authRole, requireAuth, UserRoles } from "@fibimarket/common";
import express from "express";
import { createCategoryController } from "../controllers/category/create-category";
import { deleteCategoryController } from "../controllers/category/delete-category";
import { getCategoriesController } from "../controllers/category/get-categories";

const router = express.Router();

router.get("/", getCategoriesController);

router.post(
  "/",
  requireAuth,
  authRole(UserRoles.admin),
  createCategoryController
);

router.delete(
  "/:id",
  requireAuth,
  authRole(UserRoles.admin),
  deleteCategoryController
);

export { router as categoryRoutes };
