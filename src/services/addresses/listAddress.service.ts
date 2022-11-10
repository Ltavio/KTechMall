import AppDataSource from "../../data-source";
import Addresses from "../../entities/addresses.entity";
import AppError from "../../errors/appErrors";
import { IListAddressResponse } from "../../interfaces/addresses";

const listAddressService = async (
  userId: string
): Promise<IListAddressResponse> => {
  const addressRepository = AppDataSource.getRepository(Addresses);

  const address = await addressRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!address) {
    throw new AppError("Addresses not found");
  }

  return {
    message: "Listed addresses",
    data: address,
  };
};

export default listAddressService;
