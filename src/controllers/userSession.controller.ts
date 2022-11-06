import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/user";

import userSessionService from "../services/session/userSession.service";

const userSessionController = async (req: Request, res: Response) => {
  const { email, password }: IUserLogin = req.body;
  const token = await userSessionService({ email, password });

  return res.json({ token });
};

export default userSessionController;
