import AppDataSource from "../../data-source";
import { Seller } from "../../entities/seller.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appErrors";
import { ISellerRequest } from "../../interfaces/seller";

const createSellerService = async (
  data: ISellerRequest,
  userId: any
): Promise<Seller> => {
  const sellerRepository = AppDataSource.getRepository(Seller);

  const userRepository = AppDataSource.getRepository(User);

  const { companyName, cnpj } = data;

  const searchSeller = await sellerRepository.findOneBy({
    companyName,
    cnpj,
  });

  const searchUserSeller = await sellerRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  const searchUser = await userRepository.findOneBy({
    id: userId,
  });

  if (searchUserSeller) {
    throw new AppError("User already register");
  }

  if (searchSeller) {
    throw new AppError("Seller already register");
  }

  if (!searchUser) {
    throw new AppError("User not found", 404);
  }

  const seller = sellerRepository.create({
    companyName: companyName,
    cnpj: cnpj,
    user: searchUser,
  });

  await sellerRepository.save(seller);

  return seller;
};

export default createSellerService;
