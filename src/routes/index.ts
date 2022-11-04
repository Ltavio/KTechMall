import categoriesRoutes from "./categories.routes";

export const AppRoutes = (app: any) => {
  app.use(categoriesRoutes);
};
