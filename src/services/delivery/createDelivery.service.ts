import AppDataSource from "../../data-source";
import Addresses from "../../entities/addresses.entity";

import Delivery from "../../entities/delivery.entity";
import AppError from "../../errors/appErrors";

import { IDeliveryRequest, IDeliveryResponse } from "../../interfaces/delivery";

const createDeliveryService = async ({
  addressId,
  receiver,
}: IDeliveryRequest): Promise<IDeliveryResponse> => {
  const deliveryRepository = AppDataSource.getRepository(Delivery);
  const addressRepository = AppDataSource.getRepository(Addresses)
  const address = await addressRepository.findOneBy({id:addressId}) 

  if(!address){throw new AppError("address not found") }

  const delivery = deliveryRepository.create({
    address: address,
    receiver: receiver,
  });

  await deliveryRepository.save(delivery);

  return {
    message: "Created delivery",
    data: delivery,
  };
};

export default createDeliveryService;
