import { Express } from "express";

import productRoutes from "./products.routes";
import orderProductRoutes from "./orderProduct.routes";
import categoriesRoutes from "./categories.routes";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import sellerRoutes from "./seller.routes";
import cartRoutes from "./cart.routes";
import deliveryRoutes from "./delivery.routes";
import paymentRouter from "./payment.routes";

export const AppRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/login", sessionRoutes());
  app.use("/sellers", sellerRoutes());
  app.use("/products", productRoutes());
  app.use("/categories" ,categoriesRoutes());
  app.use('/ordersProduct', orderProductRoutes());
  app.use("/cart", cartRoutes());
  app.use("/delivery", deliveryRoutes());
  app.use("/payment", paymentRouter())
};