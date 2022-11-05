export interface IOrderProductRequest {
  userId: string
  productId: string
  quantity: number
  price_product: number
  price_total_products: number
  createAt: Date
  updatedAt: Date
}

export interface IOrderProductUpdate {
  quantity: number
}
