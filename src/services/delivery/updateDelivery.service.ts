import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Delivery from "../../entities/delivery.entity";

import { IDeliveryResponse, IDeliveryUpdate } from "../../interfaces/delivery";

const updateDeliveryService = async (
  dataDelivery: IDeliveryUpdate,
  id: string
): Promise<IDeliveryResponse> => {
  const deliveryRepository = AppDataSource.getRepository(Delivery);
  const delivery = await deliveryRepository.findOneBy({ id });

  if (!delivery) {
    throw new AppError("Delivery not found");
  }

  const data = Object.keys(dataDelivery);

  if (data.includes("id")) {
    throw new AppError("Not Possible update ID", 401);
  }

  await deliveryRepository.update(delivery!.id, {
    ...delivery,
    ...dataDelivery,
    updatedAt: new Date(),
  });

  return {
    message: "Updated delivery",
    data: delivery,
  };
};

export default updateDeliveryService;
