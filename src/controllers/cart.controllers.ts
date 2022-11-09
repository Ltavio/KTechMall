import { Request, Response } from "express";
import createCartService from "../services/cart/createCart.service";
import listCartService from "../services/cart/listCart.service";

const createCartController = async (req: Request, res: Response) => {
  const cartData = req.body;
  const response = await createCartService(cartData);

  return res.status(201).json(response);
};

const listCartController = async (req: Request, res: Response) => {
  const userId = req.params.id

  const response = await listCartService(userId);
  return res.status(200).json(response);
};

export { createCartController, listCartController };
