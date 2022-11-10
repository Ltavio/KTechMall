import AppDataSource from "../../data-source";
import Addresses from "../../entities/addresses.entity";
import AppError from "../../errors/appErrors";
import { IAddressResponse, IAddressUpdate } from "../../interfaces/addresses";

const updateAddressService = async (
  addressData: IAddressUpdate,
  userId: string
): Promise<IAddressResponse> => {
  const addressRepository = AppDataSource.getRepository(Addresses);

  const searchAddress = await addressRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!searchAddress) {
    throw new AppError("Addresses not found");
  }

  const { city, complement, district, number, road, state, zipCode } =
    addressData;

  await addressRepository.update(searchAddress.id, {
    state: state ? state : searchAddress.state,
    city: city ? city : searchAddress.city,
    zipCode: zipCode ? zipCode : searchAddress.zipCode,
    district: district ? district : searchAddress.district,
    road: road ? road : searchAddress.road,
    number: number ? number : searchAddress.number,
    complement: complement ? complement : searchAddress.complement,
  });

  const address = await addressRepository.findOneBy({ id: searchAddress.id });

  return {
    message: "Updated address",
    data: address!,
  };
};

export default updateAddressService;
