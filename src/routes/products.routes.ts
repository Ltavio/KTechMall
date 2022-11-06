import { Router } from "express";

import {
  createProductController,
  listProductController,
  listOneProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/products.controller";

const routes = Router();

const productRoutes = () => {
  routes.post("/", createProductController);
  routes.get("/", listProductController);
  routes.get("/:id", listOneProductController);
  routes.patch("/:id", updateProductController);
  routes.delete("/:id", deleteProductController);

  return routes;
};

export default productRoutes;
