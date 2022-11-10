import AppDataSource from "../../data-source";
import Addresses from "../../entities/addresses.entity";
import Cart from "../../entities/cart.entity";
import Delivery from "../../entities/delivery.entity";

import Order_Product from "../../entities/orderProduct.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appErrors";
import { ICartRequest, ICartResponse } from "../../interfaces/cart";

const createCartService = async (
  id: string
): Promise<ICartResponse> => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const userRepository = AppDataSource.getRepository(User);
  const deliveryRepository = AppDataSource.getRepository(Delivery);
  const orderProductRepository = AppDataSource.getRepository(Order_Product)
  const addressRepository = AppDataSource.getRepository(Addresses)



  const address = await addressRepository.findOne({where:{user:{id: id}}})  
  const user = await userRepository.findOneBy({ id: id });
  const delivery = await deliveryRepository.findOne({where: {address:{id: address?.id}}})
  const ordersProduct = await orderProductRepository.find({where: { user:{ id: id}}})
  let valorTotal = 0
  ordersProduct.forEach(element => {
    valorTotal += element.quantity*element.product.price
  });
  
  if(!address){throw new AppError("Address not found") }
  if (!user) { throw new AppError("User not found") }
  if (!delivery) { throw new AppError("Delivery not found") }
  
  const newDelivery = deliveryRepository.create({
   receiver: "Kenzie",
   address: address,
  })

  await deliveryRepository.save(newDelivery)

  
  if (!user) { throw new AppError("User not found") }
  if (!delivery) { throw new AppError("Delivery not found")}

  const newCart = cartRepository.create({
    frete: 0,
    sub_total_orders: valorTotal,
    price_total: valorTotal,
    user,
    delivery,
  });

  const cart = await cartRepository.save(newCart);
  

  return {
    message: "Created delivery",
    data: cart
  };
};

export default createCartService;
