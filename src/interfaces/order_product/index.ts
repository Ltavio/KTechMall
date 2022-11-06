export interface IOrderProduct {
  id: string
  quantity: number
  price_product: number
  price_total_products: number
  createdAt: Date
  updatedAt: Date
};

export interface IOrderProductRequest {
  userId: string
  productId: string
  quantity: number
  price_product: number
  price_total_products: number
  createAt: Date
  updatedAt: Date
};

export interface IOrderProductUpdate {
  quantity: number
};

export interface IOrderProductResponse {
  message: string,
  data: IOrderProduct
};

export interface IListOrderProductResponse {
  message: string,
  data: IOrderProduct[]
};
