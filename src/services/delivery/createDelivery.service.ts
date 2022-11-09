import AppDataSource from "../../data-source";

import Delivery from "../../entities/delivery.entity";

import { IDeliveryRequest, IDeliveryResponse } from "../../interfaces/delivery";

const createDeliveryService = async ({
  address_id,
  receiver,
}: IDeliveryRequest): Promise<IDeliveryResponse> => {
  const deliveryRepository = AppDataSource.getRepository(Delivery);

  const delivery = deliveryRepository.create({
    address_id: address_id,
    receiver: receiver,
  });

  await deliveryRepository.save(delivery);

  return {
    message: "Created delivery",
    data: delivery,
  };
};

export default createDeliveryService;
