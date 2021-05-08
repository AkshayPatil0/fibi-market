import express from "express";
import multer from "multer";

import { authRole, requireAuth, UserRoles } from "@fibimarket/common";
import { createBannerController } from "../controllers/banner/create-banner";
import { deleteBannerController } from "../controllers/banner/delete-banner";
import { editBannerController } from "../controllers/banner/edit-banner";
import { getBannersController } from "../controllers/banner/get-banners";

const router = express.Router();

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: "uploads/banners",
  filename: (req, file, cb) => {
    const fileType = file.originalname.split(".").slice(-1)[0];
    cb(null, new Date(Date.now()).toISOString() + "." + fileType);
  },
});
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
