import { Express } from "express";
import { sellerRoutes } from "./seller.routes";

export const AppRoutes = (app: Express) => {
  app.use("/seller", sellerRoutes());
};
