"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var common_1 = require("@fibimarket/common");
var create_blog_1 = require("../controllers/blog/create-blog");
var get_blog_1 = require("../controllers/blog/get-blog");
var get_blogs_1 = require("../controllers/blog/get-blogs");
var delete_blog_1 = require("../controllers/blog/delete-blog");
var update_blog_1 = require("../controllers/blog/update-blog");
var remove_blog_image_1 = require("../controllers/image/remove-blog-image");
var add_blog_image_1 = require("../controllers/image/add-blog-image");
var update_blog_images_1 = require("../controllers/image/update-blog-images");
var remove_blog_cover_1 = require("../controllers/image/remove-blog-cover");
var add_blog_cover_1 = require("../controllers/image/add-blog-cover");
var router = express_1.default.Router();
exports.blogRoutes = router;
var storage = multer_1.default.memoryStorage();
var upload = multer_1.default({ storage: storage });
router.get("/", get_blogs_1.getBlogsController);
router.post("/", common_1.requireAuth, create_blog_1.createBlogController);
router.get("/:slug", get_blog_1.getBlogController);
router.put("/:id", update_blog_1.updateBlogController);
router.post("/:id/images/remove", common_1.requireAuth, remove_blog_image_1.removeBlogImageController);
router.post("/:id/images", common_1.requireAuth, upload.array("images", 10), add_blog_image_1.addBlogImageController);
router.put("/:id/images", common_1.requireAuth, upload.array("images", 10), update_blog_images_1.updateBlogImagesController);
router.post("/:id/cover/remove", common_1.requireAuth, remove_blog_cover_1.removeBlogCoverController);
router.post("/:id/cover", common_1.requireAuth, upload.single("cover"), add_blog_cover_1.addBlogCoverController);
router.delete("/:id", delete_blog_1.deleteBlogController);