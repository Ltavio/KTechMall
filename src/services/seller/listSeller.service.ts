import AppDataSource from "../../data-source";
import { Seller } from "../../entities/seller.entity";
import AppError from "../../errors/appErrors";

const listSellerService = async (userId: string): Promise<Seller> => {
  const sellerRepository = AppDataSource.getRepository(Seller);

  const searchUser = await sellerRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!searchUser) {
    throw new AppError("Seller not found", 404);
  }

  return searchUser;
};

export default listSellerService;
