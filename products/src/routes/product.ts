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

import { createProductValidator } from "../validators/product/create-product-validator";
import { updateProductValidator } from "../validators/product/update-product-validator";
import { publishProductController } from "../controllers/products/publish-product";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/products",
  filename: (req, file, cb) => {
    const fileType = file.originalname.split(".").slice(-1)[0];
    cb(null, new Date(Date.now()).toISOString() + "." + fileType);
  },
});
const upload = multer({ storage: storage });

router.get("/:id", getProductControlller);
router.get("/", getProductsController);

router.post(
  "/",
  requireAuth,
  authRole(UserRoles.vendor),
  createProductValidator,
  validateRequest,
  createProductController
);

router.put(
  "/:id",
  requireAuth,
  authRole(UserRoles.vendor),
  updateProductValidator,
  validateRequest,
  updateProductController
);

router.post(
  "/:id/images/remove",
  requireAuth,
  authRole(UserRoles.vendor),
  removeProductImageController
);
router.post(
  "/:id/images",
  requireAuth,
  authRole(UserRoles.vendor),
  upload.array("images", 10),
  addProductImageController
);
router.put(
  "/:id/images",
  requireAuth,
  authRole(UserRoles.vendor),
  upload.array("images", 10),
  updateProductImagesController
);

router.delete(
  "/:id",
  requireAuth,
  authRole(UserRoles.vendor),
  deleteProductController
);
router.put(
  "/publish/:id",
  requireAuth,
  authRole(UserRoles.admin),
  publishProductController
);

export { router as productRoutes };
