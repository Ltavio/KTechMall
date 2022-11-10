import { Request, Response } from "express"
import createPaymentService from "../services/payment/createPayment.service"


const createPaymentController = async(req:Request, res:Response)=>{
  const paymentData = req.body
  const { id } = req.params
  const response = await createPaymentService(paymentData, id)

  return res.status(201).json(response)
}

export {
  createPaymentController
}