import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Seller from "../../entities/seller.entity";
import User from "../../entities/user.entity";

import { ISellerRequest, ISellerResponse } from "../../interfaces/seller";

const createSellerService = async ( 
    data:ISellerRequest, 
    userId: string):Promise<ISellerResponse> => {
  const sellerRepository = AppDataSource.getRepository(Seller);
  const userRepository = AppDataSource.getRepository(User);

  const { companyName, cnpj } = data;

  const searchUser = await userRepository.findOneBy({ id: userId });
  const searchSeller = await sellerRepository.findOneBy({ companyName, cnpj });
  const searchUserSeller = await sellerRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (searchUserSeller) { throw new AppError( "User already register" )};
  if (searchSeller) { throw new AppError( "Seller already register" )};
  if (!searchUser) { throw new AppError( "User not found", 404 )};

  const seller = sellerRepository.create({
    companyName: companyName,
    cnpj: cnpj,
    user: searchUser,
  });

  await sellerRepository.save(seller);

  return { 
    message: "Created seller",
    data: seller 
  };
};

export default createSellerService;