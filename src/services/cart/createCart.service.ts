import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import Delivery from "../../entities/delivey.entity";
import Order_Product from "../../entities/orderProduct.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appErrors";
import { ICart, ICartRequest, ICartResponse } from "../../interfaces/cart";

const createCartService = async (
  cartData: ICartRequest
): Promise<ICartResponse> => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const userRepository = AppDataSource.getRepository(User);
  const deliveryRepository = AppDataSource.getRepository(Delivery);
  const user = await userRepository.findOneBy({ id: cartData.userId });
  const delivery = await deliveryRepository.findOneBy({
    id: cartData.deliveryId,
  });

  if (!user) {
    throw new AppError("User not found");
  }
  
  if (!delivery) {
    throw new AppError("Delivery not found");
  }

  const newCart = cartRepository.create({
    ...cartData,
    user,
    delivery,
  });

  const teste = await cartRepository.save(newCart);

  return {
    message: "Created delivery",
    data: teste
  };
};

export default createCartService;
