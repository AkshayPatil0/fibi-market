import express from "express";
import { cancelOrderController } from "../controllers/order/cancel-order";
import { createOrderController } from "../controllers/order/create-order";
import { getMyOrdersController } from "../controllers/order/get-my-orders";
import { getOrderController } from "../controllers/order/get-order";
import { getOrdersController } from "../controllers/order/get-orders";
import { updateOrderController } from "../controllers/order/update-order";

const router = express.Router();

router.post("/", createOrderController);
router.get("/", getOrdersController);
router.get("/myorders", getMyOrdersController);
router.get("/:id", getOrderController);
router.put("/:id", updateOrderController);
router.delete("/:id", cancelOrderController);

export { router as orderRoutes };
