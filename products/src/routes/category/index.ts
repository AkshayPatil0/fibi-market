import express from "express";

const router = express.Router();

import { newCategoryRoute } from "./new";
import { getCategoryRoute } from "./get";
import { deleteCategoryRoute } from "./delete";

router.use(newCategoryRoute);
router.use(getCategoryRoute);
router.use(deleteCategoryRoute);

export { router as categoryRoute };
