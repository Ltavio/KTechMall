import AppDataSource from "../../data-source";
import { Seller } from "../../entities/seller.entity";
import AppError from "../../errors/appErrors";

const deleteSellerService = async (userId: string): Promise<Seller> => {
  const sellerRepository = AppDataSource.getRepository(Seller);

  const searchSeller = await sellerRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!searchSeller) {
    throw new AppError("Seller not found", 404);
  }

  if (!searchSeller.isActive) {
    throw new AppError("Seller not active");
  }

  await sellerRepository.update(searchSeller.id, {
    isActive: false,
  });

  const seller = await sellerRepository.findOneBy({
    id: searchSeller.id,
  });

  return seller!;
};

export default deleteSellerService;
