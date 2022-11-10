import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";
import User from "../../entities/user.entity";
import Addresses from "../../entities/addresses.entity";
import { IAddressRequest, IAddressResponse } from "../../interfaces/addresses";

const createAddressService = async (
  addressData: IAddressRequest,
  userId: string
): Promise<IAddressResponse> => {
  const addressRepository = AppDataSource.getRepository(Addresses);
  const userRepository = AppDataSource.getRepository(User);

  const searchUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!searchUser) {
    throw new AppError("User not found");
  }

  const { city, district, number, road, state, zipCode, complement } =
    addressData;

  const address = addressRepository.create({
    state: state,
    district: district,
    zipCode: zipCode,
    city: city,
    road: road,
    number: number,
    complement: complement,
    user: [searchUser],
  });

  await addressRepository.save(address);

  return {
    message: "Created addresses",
    data: address,
  };
};

export default createAddressService;
