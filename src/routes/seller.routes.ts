import { Router } from "express";
import {
  createSellerController,
  updatedSellerController,
  deleteSellerController,
  listSellerController,
} from "../controllers/seller.controller";

import authTokenMiddleware from "../middlewares/authToken.middleware";

const routes = Router();

const sellerRoutes = () => {
  routes.post("/", authTokenMiddleware, createSellerController);
  routes.patch("/",authTokenMiddleware, updatedSellerController);
  routes.delete("/",authTokenMiddleware, deleteSellerController);
  routes.get("/",authTokenMiddleware, listSellerController);

  return routes;
};

export default sellerRoutes;