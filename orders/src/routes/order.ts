import { authRole, requireAuth, UserRoles } from "@fibimarket/common";
import express from "express";
import { cancelOrderController } from "../controllers/order/cancel-order";
import { createOrderController } from "../controllers/order/create-order";
import { getMyOrdersController } from "../controllers/order/get-my-orders";
import { getOrderController } from "../controllers/order/get-order";
import { getOrdersController } from "../controllers/order/get-orders";
import { updateOrderController } from "../controllers/order/update-order";
import { updateOrderStatusController } from "../controllers/order/update-order-status";

const router = express.Router();

router.post("/", createOrderController);
router.get("/", getOrdersController);
router.get("/myorders", getMyOrdersController);
router.get("/:id", getOrderController);
router.put("/:id", updateOrderController);
router.put(
  "/status/:id",
  authRole(UserRoles.admin),
  updateOrderStatusController
);

router.delete("/:id", cancelOrderController);

export { router as orderRoutes };
