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
import { submitQuiz } from "../controllers/users/submit-quiz";

const router = express();

router.get("/", currentUser, getUsersController);

router.post(
  "/setrole",
  currentUser,
  requireAuth,
  authRole(UserRoles.admin),
  setUserRoleController
);

router.post("/collectReward", currentUser, submitQuiz);

router.delete("/", currentUser, requireAuth, deleteUserController);

export { router as usersRoute };
