import express from "express";
import {
  authRole,
  currentUser,
  requireAuth,
  UserRoles,
} from "@fibimarket/common";
import { deleteUserController } from "../controllers/users/delete-user";
import { getUsersController } from "../controllers/users/get-users";
import { setUserRoleController } from "../controllers/users/set-user-role";

const router = express();

router.get("/api/users", currentUser, getUsersController);

router.post(
  "/api/users/setrole",
  currentUser,
  requireAuth,
  authRole(UserRoles.admin),
  setUserRoleController
);

router.delete("/api/users", currentUser, requireAuth, deleteUserController);

export { router as usersRoute };
