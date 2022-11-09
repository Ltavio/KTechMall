import { Router } from "express";
import {
  createAddressController,
  listAddressController,
  updateAddressController,
} from "../controllers/addressess.controller";
import authTokenMiddleware from "../middlewares/authToken.middleware";

const routes = Router();

const addressRoutes = () => {
  routes.post("/", authTokenMiddleware, createAddressController);
  routes.patch("/", authTokenMiddleware, updateAddressController);
  routes.get("/", authTokenMiddleware, listAddressController);
  /* routes.delete("/",authTokenMiddleware, deleteSellerController); */

  return routes;
};

export default addressRoutes;
