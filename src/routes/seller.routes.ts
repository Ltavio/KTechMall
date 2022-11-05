import { Router } from "express";

import {
  createSellerController,
  updatedSellerController,
  deleteSellerController,
  listSellerController,
} from "../controllers/seller.controller";
import authTokenMiddleware from "../middlewares/authToken.middleware";

const routes = Router();

export const sellerRoutes = () => {
  routes.post("/", authTokenMiddleware, createSellerController);
  routes.patch("/", updatedSellerController);
  routes.delete("/", deleteSellerController);
  routes.get("/", listSellerController);

  return routes;
};
