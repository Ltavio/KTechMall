import { Router } from "express";
import {
  createDeliveryController,
  updateDeliveryController,
} from "../controllers/delivery.controller";

import authTokenMiddleware from "../middlewares/authToken.middleware";

const routes = Router();

const deliveryRoutes = () => {
  routes.post("/", authTokenMiddleware, createDeliveryController);
  //routes.patch("/:id", authTokenMiddleware, updateDeliveryController);
  return routes;
};

export default deliveryRoutes;
