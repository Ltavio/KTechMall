import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Seller from "../../entities/seller.entity";

import { ISellerResponse } from "../../interfaces/seller";

const listSellerService = async (userId: string): Promise<ISellerResponse> => {
  const sellerRepository = AppDataSource.getRepository(Seller);
  const searchUser = await sellerRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!searchUser) { throw new AppError("Seller not found", 404) };

  return {
    message: "Listed seller",
    data: searchUser
  }; 
};

export default listSellerService;
