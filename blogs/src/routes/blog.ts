import express from "express";
import multer from "multer";
import { requireAuth } from "@fibimarket/common";

import { createBlogController } from "../controllers/create-blog";
import { getBlogController } from "../controllers/get-blog";
import { getBlogsController } from "../controllers/get-blogs";
import { deleteBlogController } from "../controllers/delete-blog";
import { updateBlogController } from "../controllers/update-blog";

import { removeBlogImageController } from "../controllers/image/remove-blog-image";
import { addBlogImageController } from "../controllers/image/add-blog-image";
import { updateBlogImagesController } from "../controllers/image/update-blog-images";
import { removeBlogCoverController } from "../controllers/image/remove-blog-cover";
import { addBlogCoverController } from "../controllers/image/add-blog-cover";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", getBlogsController);
router.post("/", requireAuth, createBlogController);
router.get("/:slug", getBlogController);
router.put("/:id", updateBlogController);

router.post("/:id/images/remove", requireAuth, removeBlogImageController);
router.post(
  "/:id/images",
  requireAuth,
  upload.array("images", 10),
  addBlogImageController
);
router.put(
  "/:id/images",
  requireAuth,
  upload.array("images", 10),
  updateBlogImagesController
);

router.post("/:id/cover/remove", requireAuth, removeBlogCoverController);
router.post(
  "/:id/cover",
  requireAuth,
  upload.single("cover"),
  addBlogCoverController
);

router.delete("/:id", deleteBlogController);

export { router as blogRoutes };
