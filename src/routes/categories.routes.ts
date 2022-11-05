import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  softDeleteCategoryController,
} from "../controllers/categories.controllers";

const routes = Router();

const categoriesRoutes = ()=>{
  routes.get("/", listCategoriesController);
  routes.post("/", createCategoryController);
  routes.patch("/:id");
  routes.delete("/:id", softDeleteCategoryController);
  routes.get("/:category_id/products");

  return routes
}

export default categoriesRoutes;
