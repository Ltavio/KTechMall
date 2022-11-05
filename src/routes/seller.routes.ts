import { Router } from "express";

import {
  createSellerController,
  updatedSellerController,
  deleteSellerController,
  listSellerController,
} from "../controllers/seller.controller";

const routes = Router();

export const sellerRoutes = () => {
  routes.post("/", createSellerController);
  routes.patch("/", updatedSellerController);
  routes.delete("/", deleteSellerController);
  routes.get("/", listSellerController);

  return routes;
};
