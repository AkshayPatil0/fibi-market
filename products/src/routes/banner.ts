import express from "express";
import multer from "multer";

import { authRole, requireAuth, UserRoles } from "@fibimarket/common";
import { createBannerController } from "../controllers/banner/create-banner";
import { deleteBannerController } from "../controllers/banner/delete-banner";
import { editBannerController } from "../controllers/banner/edit-banner";
import { getBannersController } from "../controllers/banner/get-banners";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", getBannersController);

router.post(
  "/",
  requireAuth,
  authRole(UserRoles.admin),
  upload.single("cover"),
  createBannerController
);

router.put(
  "/:id",
  requireAuth,
  authRole(UserRoles.admin),
  upload.single("cover"),
  editBannerController
);
router.delete(
  "/:id",
  requireAuth,
  authRole(UserRoles.admin),
  deleteBannerController
);

export { router as bannerRoutes };
