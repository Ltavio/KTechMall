import AppDataSource from "../../data-source";
import Order_Product from "../../entities/orderProduct.entity";
import AppError from "../../errors/appErrors";

import { IOrderProductRequest } from "../../interfaces/order_product";
import { Product } from "../../entities/product.entity";
import { User } from "../../entities/user.entity";

const createOrderProductService = async(id:string, idProduct:string, orderProductData:IOrderProductRequest)=>{
  const orderProductRepository = AppDataSource.getRepository(Order_Product)
  const productRepository = AppDataSource.getRepository(Product)
  const userRepository = AppDataSource.getRepository(User)

  const orderProduct = await orderProductRepository.findOne({where:{product: { id: orderProductData.productId}}})
  const product = await productRepository.findOneBy({id:orderProductData.productId})
  const user = await userRepository.findOneBy({id})
  
  if(orderProduct){ throw new AppError("Order product alreay exists") };
  if(!user){ throw new AppError("User not found", 404) }
  if(!product){ throw new AppError("Product not found", 404) }
  if(product.stock < orderProductData.quantity){ throw new AppError("insufficient stock", 401) }
  const newOrderProduct = orderProductRepository.create({
    ...orderProductData,
    user,
    product
  })
  await orderProductRepository.save(newOrderProduct)

  return {
    message: "Created order_product",
    data: newOrderProduct
  }


};

export default createOrderProductService;