import { Router } from "express";

import {
  createUserController,
  listUsersController,
  deleteUserController,
  updateUserController,
} from "../controllers/user/user.controller";

const routes = Router();

const userRoutes = () => {
  routes.post("", createUserController);
  routes.get("", listUsersController);
  routes.patch("/:id", updateUserController);
  routes.delete("/:id", deleteUserController);

  return routes;
};

export default userRoutes;
