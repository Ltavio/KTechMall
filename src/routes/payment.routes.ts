import { Router } from "express";
import { createPaymentController } from "../controllers/payment.controller";
import authTokenMiddleware from "../middlewares/authToken.middleware";

const routes = Router()

const paymentRouter = ()=>{
  routes.post("/cart/:id", authTokenMiddleware, createPaymentController)

  return routes
};

export default paymentRouter;