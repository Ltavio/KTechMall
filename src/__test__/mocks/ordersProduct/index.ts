import { IOrderProductRequest, IOrderProductUpdate } from "../../../interfaces/order_product";

export const mockedOrderProduct: IOrderProductRequest = {
  userId: "",
  productId: "", 
  quantity: 2,
  price_product: 13,
  price_total_products: 39,
  createAt: new Date(),
  updatedAt: new Date()
};
export const mockedSecondOrderProduct: IOrderProductRequest = {
  userId: "",
  productId: "", 
  quantity: 1,
  price_product: 13,
  price_total_products: 39,
  createAt: new Date(),
  updatedAt: new Date()
};

export const mockedOrderProductUpdate: IOrderProductUpdate = {
  quantity: 1
}