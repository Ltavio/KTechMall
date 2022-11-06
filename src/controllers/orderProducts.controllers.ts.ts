import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer"

import createOrderProductService from "../services/orderProduct/createOrderProduct.service";
import updateOrderProductService from "../services/orderProduct/updateOrderProduct.service";
import listOrdersProductService from "../services/orderProduct/listOrdersProduct.service";
import softDeleteOrderProductService from "../services/orderProduct/softDeleteOrderProduct.service";

const createOrderProductController = async(req:Request, res: Response)=>{
  const orderProductData = req.body
  const idProduct = req.params.id
  const id = req.user.id
  
  const response = await createOrderProductService(id, idProduct, orderProductData)

  return res.status(201).json(instanceToPlain(response))
};

const updateOrderProductController = async(req:Request, res:Response)=>{
  const orderProductData = req.body
  const id = req.params.id
  const response =  await updateOrderProductService(id, orderProductData)

  return res.status(201).json(instanceToPlain(response))
}

const listOrdersProductController = async(req:Request, res:Response)=>{
  const response = await listOrdersProductService()

  return res.status(200).json(instanceToPlain(response))
}

const softDeleteOrderProductCotroller = async(req:Request, res:Response)=>{
  const id = req.params.id
  const response = await softDeleteOrderProductService(id)

  return res.status(204).json(response)
}

export {
  createOrderProductController,
  updateOrderProductController,
  listOrdersProductController,
  softDeleteOrderProductCotroller
}

