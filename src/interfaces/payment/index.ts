export interface IPayment {
  id: string
  done: boolean
  sub_total: number,
  createdAt: Date,
}

export interface IPaymentRequest {
  sub_total: number,
  createdAt: Date,
}

export interface IPaymentResponse {
  message: string,
  data: IPayment
}