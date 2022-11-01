import "reflect-metadata"
import "express-async-errors"
import express from "express";
import { AppRoutes } from "./routes";
import handleErrorMidleware from "./middlewares/handleError.middleware";


const app = express();
app.use(express.json());

AppRoutes(app)

app.use(handleErrorMidleware)

export default app;