import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Order_Product from "../../entities/orderProduct.entity";
import User from "../../entities/user.entity";
import Product from "../../entities/products.entity";

import { IOrderProductRequest, IOrderProductResponse } from "../../interfaces/order_product";

const createOrderProductService = async(
    id:string, 
    idProduct:string, 
    orderProductData:IOrderProductRequest):Promise<IOrderProductResponse>=>{
  const orderProductRepository = AppDataSource.getRepository(Order_Product);
  const productRepository = AppDataSource.getRepository(Product);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({id});
  const product = await productRepository.findOneBy({id:orderProductData.productId});
  const orderProduct = await orderProductRepository.findOne(
    {where:{product: { id: orderProductData.productId}}});
  
  if(orderProduct){ throw new AppError("Order product alreay exists") };
  if(!user){ throw new AppError("User not found", 404) };
  if(!product){ throw new AppError("Product not found", 404) };
  if( product.stock < orderProductData.quantity ){
     throw new AppError("insufficient stock", 401) };
  
  const newOrderProduct = orderProductRepository.create({
    ...orderProductData,
    user,
    product
  });
  await orderProductRepository.save(newOrderProduct);

  return {
    message: "Created order_product",
    data: newOrderProduct
  };
};

export default createOrderProductService;