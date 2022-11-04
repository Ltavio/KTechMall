import productRoutes from "./products.routes";

export const AppRoutes = (app: any) => {
  app.use("/product", productRoutes());
  
};
