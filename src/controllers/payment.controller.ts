import { Request, Response } from "express"
import createPaymentService from "../services/payment/createPayment.service"


const createPaymentController = async(req:Request, res:Response)=>{
  const { id } = req.params
  const response = await createPaymentService(id)

  return res.status(201).json(response)
}

export {
  createPaymentController
}