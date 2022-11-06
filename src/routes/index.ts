import userRoutes from "./user.routes";
import { Express } from "express";

import sessionRoutes from "./session.routes";
import { sellerRoutes } from "./seller.routes";
import productRoutes from "./products.routes";
import categoriesRoutes from "./categories.routes";
import orderProductRoutes from "./orderProduct.routes";

export const AppRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/login", sessionRoutes());
  app.use("/seller", sellerRoutes());
  app.use("/products", productRoutes());
  app.use("/categories" ,categoriesRoutes());
  app.use('/orderProducts', orderProductRoutes())
};