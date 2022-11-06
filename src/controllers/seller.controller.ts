import { Request, Response } from "express";
import { ISellerRequest } from "../interfaces/seller";
import createSellerService from "../services/seller/createSeller.service";
import deleteSellerService from "../services/seller/deleteSeller.service";
import listSellerService from "../services/seller/listSeller.service";
import updatedSellerService from "../services/seller/updatedSeller.service";
import { instanceToPlain } from "class-transformer";
const createSellerController = async (req: Request, res: Response) => {
  const data: ISellerRequest = req.body;

  const id = req.user.id;

  const response = await createSellerService(data, id);

  return res.status(201).json(instanceToPlain(response));
};

const updatedSellerController = async (req: Request, res: Response) => {
  const data = req.body;

  const id = req.user.id;

  const updatedSeller = await updatedSellerService(data, id);

  return res.status(200).json({ "Updated seller": updatedSeller });
};

const deleteSellerController = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const deleteSeller = await deleteSellerService(userId);

  res.status(204).json({ "Delete seller": deleteSeller });
};

const listSellerController = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const listSeller = await listSellerService(userId);

  res.status(200).json(listSeller);
};

export {
  createSellerController,
  updatedSellerController,
  deleteSellerController,
  listSellerController,
};
