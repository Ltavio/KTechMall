import { Request, Response } from "express";

import createDeliveryService from "../services/delivery/createDelivery.service";
import updateDeliveryService from "../services/delivery/updateDelivery.service";

const createDeliveryController = async (
  req: Request,
  res: Response
) => {
  const { addressId, receiver } = req.body;
  const response = await createDeliveryService({ addressId, receiver });
  return res.status(201).json(response);
};

const updateDeliveryController = async (req: Request, res: Response) => {
  const dataDelivery = req.body;
  const { id } = req.params;
  const response = await updateDeliveryService(dataDelivery, id);
  return res.status(201).json(response);
};

export { createDeliveryController, updateDeliveryController };
