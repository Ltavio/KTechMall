import { Router } from "express";
import { createOrderProductController, listOrdersProductController, softDeleteOrderProductCotroller, updateOrderProductController } from "../controllers/orderProducts.controllers.ts";
import authTokenMiddleware from "../middlewares/authToken.middleware";

const routes = Router()

const orderProductRoutes = () => {
  routes.post('/product/:id', authTokenMiddleware, createOrderProductController)
  routes.get('/', authTokenMiddleware, listOrdersProductController)
  routes.patch('/:id', authTokenMiddleware, updateOrderProductController)
  routes.delete('/:id', authTokenMiddleware, softDeleteOrderProductCotroller)
  
  return routes
};

export default orderProductRoutes;