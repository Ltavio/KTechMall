import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  softDeleteCategoryController,
} from "../controllers/categories.controllers";

const routes = Router();

const categoriesRoutes = () => {
  routes.post("/", createCategoryController);
  routes.get("/", listCategoriesController);
  routes.get("/:category_id/products");
  routes.patch("/:id");
  routes.delete("/:id", softDeleteCategoryController);

  return routes
}

export default categoriesRoutes;
