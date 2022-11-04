import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";

export const AppRoutes = (app: any) => {
  app.use("/users", userRoutes());
  app.use("/login", sessionRoutes());
};
