import { Request, Response } from "express";

import createAddressService from "../services/addresses/createAddress.service";
import listAddressService from "../services/addresses/listAddress.service";
import updateAddressService from "../services/addresses/updateAddress.service";

const createAddressController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const addressData = req.body;
  const userId = req.user.id;

  const response = await createAddressService(addressData, userId);

  return res.status(201).json(response);
};

const listAddressController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const response = await listAddressService(userId);

  return res.status(200).json(response);
};

const updateAddressController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const addressData = req.body;
  const userId = req.user.id;
  const response = await updateAddressService(addressData, userId);

  return res.status(201).json(response);
};

export {
  createAddressController,
  listAddressController,
  updateAddressController,
};
