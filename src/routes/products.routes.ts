import { Router } from "express";
import {
  createProductController,
  listProductController,
  listOneProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/products.controller";

import authTokenMiddleware from "../middlewares/authToken.middleware";

const routes = Router();

const productRoutes = () => {
  routes.post("/",authTokenMiddleware, createProductController);
  routes.patch("/:id",authTokenMiddleware, updateProductController);
  routes.delete("/:id",authTokenMiddleware, deleteProductController);
  routes.get("/:id", listOneProductController);
  routes.get("/", listProductController);

  return routes;
};

export default productRoutes;