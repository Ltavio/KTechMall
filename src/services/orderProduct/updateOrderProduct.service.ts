import AppDataSource from "../../data-source";
import Order_Product from "../../entities/orderProduct.entity";
import { Products } from "../../entities/products.entity";
import AppError from "../../errors/appErrors";
import { IOrderProductUpdate } from "../../interfaces/order_product";

const updateOrderProductService = async(id:string, orderProductData:IOrderProductUpdate)=>{
  const orderProductRepository = AppDataSource.getRepository(Order_Product)
  const productRepository = AppDataSource.getRepository(Products)
  
  const orderProduct = await orderProductRepository.findOneBy({id})

  if(!orderProduct){ throw new AppError("Order Product not found") }
  if(orderProduct.product.stock < orderProductData.quantity){ throw new AppError("insufficient stock", 401) }

  const newOrderProduct = {
    ...orderProduct,
    quantity: orderProductData.quantity
  }

  console.log(newOrderProduct)
  await orderProductRepository.update(orderProduct, newOrderProduct)

  return {
    message: "Updated order_product",
    data: newOrderProduct
  }
}

export default updateOrderProductService;