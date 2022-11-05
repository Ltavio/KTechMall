import { Router } from "express";

import userSessionController from "../controllers/session/userSession.controller";

const routes = Router();

const sessionRoutes = () => {
  routes.post("", userSessionController);
  return routes;
};

export default sessionRoutes;
