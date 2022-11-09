import { Router } from "express";
import  { createCartController, listCartController }  from "../controllers/cart.controllers";
const routes = Router();

const cartRoutes = () => {
  routes.post("/", createCartController);
  routes.get("/:id", listCartController);
  return routes;
};

export default cartRoutes;