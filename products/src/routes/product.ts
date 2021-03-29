import express from "express";
import multer from "multer";
import {
  authRole,
  requireAuth,
  UserRoles,
  validateRequest,
} from "@fibimarket/common";

import { createProductController } from "../controllers/products/create-product";
import { deleteProductController } from "../controllers/products/delete-product";
import { getProductControlller } from "../controllers/products/get-product";
import { getProductsController } from "../controllers/products/get-products";
import { updateProductController } from "../controllers/products/update-product";

import { addProductImageController } from "../controllers/products/image/add-product-image";
import { removeProductImageController } from "../controllers/products/image/remove-product-image";
import { updateProductImagesController } from "../controllers/products/image/update-product-images";

import { addProductVariantController } from "../controllers/products/variant/add-product-variant";
import { removeProductVariantController } from "../controllers/products/variant/remove-product-variant";

import { createProductValidator } from "../validators/product/create-product-validator";
import { updateProductValidator } from "../validators/product/update-product-validator";
import { getProductVariantController } from "../controllers/products/variant/get-product-variant";
import { updateProductVariantController } from "../controllers/products/variant/update-product-variant";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/:id", getProductControlller);
router.get("/", getProductsController);

router.post(
  "/",
  requireAuth,
  authRole(UserRoles.vendor),
  // createProductValidator,
  validateRequest,
  createProductController
);

router.put(
  "/:id",
  requireAuth,
  authRole(UserRoles.vendor),
  // updateProductValidator,
  // validateRequest,
  updateProductController
);

router.post("/:id/images/remove", requireAuth, removeProductImageController);
router.post(
  "/:id/images",
  requireAuth,
  upload.array("images", 10),
  addProductImageController
);

// router.get("/:id/variants/:variantId", getProductVariantController);
router.post(
  "/:id/variants",
  // requireAuth,
  addProductVariantController
);
router.put(
  "/:id/variants/:variantId",
  // requireAuth,
  updateProductVariantController
);
router.post(
  "/:id/variants/remove",
  // requireAuth,
  removeProductVariantController
);

router.put(
  "/:id/images",
  requireAuth,
  upload.array("images", 10),
  updateProductImagesController
);

router.delete(
  "/:id",
  requireAuth,
  authRole(UserRoles.vendor),
  deleteProductController
);

export { router as productRoutes };
