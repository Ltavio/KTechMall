import { Router } from "express";
import {
  createUserController,
  listUsersController,
  deleteUserController,
  updateUserController,
} from "../controllers/user.controller";

import authTokenMiddleware from "../middlewares/authToken.middleware";

const routes = Router();

const userRoutes = () => {
  routes.post("/", createUserController);
  routes.patch("/:id",authTokenMiddleware, updateUserController);
  routes.delete("/:id",authTokenMiddleware, deleteUserController);
  routes.get("/",authTokenMiddleware, listUsersController);

  return routes;
};

export default userRoutes;