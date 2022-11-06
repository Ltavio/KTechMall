import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  softDeleteCategoryController,
} from "../controllers/categories.controllers";

import authTokenMiddleware from "../middlewares/authToken.middleware";

const routes = Router();

const categoriesRoutes = () => {
  routes.post("/", authTokenMiddleware, createCategoryController);
  routes.patch("/:id"); // lacking
  routes.delete("/:id",authTokenMiddleware, softDeleteCategoryController);
  routes.get("/", listCategoriesController);
  routes.get("/:id/products"); // lacking

  return routes
}

export default categoriesRoutes;