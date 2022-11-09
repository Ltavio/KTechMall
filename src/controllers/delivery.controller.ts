import { Request, Response } from "express";

import createDeliveryService from "../services/delivery/createDelivery.service";
import updateDeliveryService from "../services/delivery/updateDelivery.service";

const createDeliveryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { address_id, receiver } = req.body;
  const response = await createDeliveryService({ address_id, receiver });
  return res.status(201).json(response);
};

const updateDeliveryController = async (req: Request, res: Response) => {
  const dataDelivery = req.body;
  const { id } = req.params;
  const response = await updateDeliveryService(dataDelivery, id);
  return res.status(201).json(response);
};

export { createDeliveryController, updateDeliveryController };
