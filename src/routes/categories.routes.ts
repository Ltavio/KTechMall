import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  softDeleteCategoryController,
} from "../controllers/categories.controllers";

const categoriesRoutes = Router();

categoriesRoutes.get("/categories", listCategoriesController);
categoriesRoutes.post("/categories", createCategoryController);
categoriesRoutes.patch("/categories/:id");
categoriesRoutes.delete("/categories/:id", softDeleteCategoryController);
categoriesRoutes.get("/categories/:category_id/products");

export default categoriesRoutes;
