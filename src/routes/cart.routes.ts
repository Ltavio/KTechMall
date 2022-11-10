import { Router } from "express";
import  { createCartController, listCartController }  from "../controllers/cart.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
const routes = Router();

const cartRoutes = () => {
  routes.post("/",authTokenMiddleware, createCartController);
  routes.get("/:id", listCartController);
  return routes;
};

export default cartRoutes;