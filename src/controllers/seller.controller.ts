import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import createSellerService from "../services/seller/createSeller.service";
import deleteSellerService from "../services/seller/deleteSeller.service";
import listSellerService from "../services/seller/listSeller.service";
import updatedSellerService from "../services/seller/updatedSeller.service";

const createSellerController = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.user.id;

  const response = await createSellerService(data, id);

  return res.status(201).json(instanceToPlain(response));
};

const updatedSellerController = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.user.id;

  const response = await updatedSellerService(data, id);

  return res.status(200).json(instanceToPlain(response));
};

const deleteSellerController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  await deleteSellerService(userId);

  res.status(204).end();
};

const listSellerController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const response = await listSellerService(userId);

  res.status(200).json(instanceToPlain(response));
};

export {
  createSellerController,
  updatedSellerController,
  deleteSellerController,
  listSellerController,
};
