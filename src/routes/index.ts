import userRoutes from "./user.routes";
import { Express } from "express";

import sessionRoutes from "./session.routes";
import { sellerRoutes } from "./seller.routes";
import productRoutes from "./products.routes";

export const AppRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/login", sessionRoutes());
  app.use("/seller", sellerRoutes());
  app.use("/product", productRoutes());
};