import express from "express";

const router = express.Router();

import { getCartRoute } from "./get";
import { addToCartRoute } from "./add";
import { removeFromCartRoute } from "./remove";

router.use(getCartRoute);
router.use(addToCartRoute);
router.use(removeFromCartRoute);

export { router as cartRoutes };
