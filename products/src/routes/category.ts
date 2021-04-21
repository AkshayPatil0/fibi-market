import express from "express";
import multer from "multer";

import { authRole, requireAuth, UserRoles } from "@fibimarket/common";
import { createCategoryController } from "../controllers/category/create-category";
import { deleteCategoryController } from "../controllers/category/delete-category";
import { editCategoryController } from "../controllers/category/edit-category";
import { getCategoriesController } from "../controllers/category/get-categories";
import { getCategoryController } from "../controllers/category/get-category";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", getCategoriesController);

router.post(
  "/",
  requireAuth,
  authRole(UserRoles.admin),
  createCategoryController
);

router.get("/:id", getCategoryController);
router.put(
  "/:id",
  requireAuth,
  authRole(UserRoles.admin),
  upload.single("image"),
  editCategoryController
);
router.delete(
  "/:id",
  requireAuth,
  authRole(UserRoles.admin),
  deleteCategoryController
);

export { router as categoryRoutes };
