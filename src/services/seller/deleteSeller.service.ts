import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Seller from "../../entities/seller.entity";

const deleteSellerService = async (userId: string): Promise<void> => {
  const sellerRepository = AppDataSource.getRepository(Seller);
  const searchSeller = await sellerRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!searchSeller) { throw new AppError("Seller not found", 404) };
  if (!searchSeller.isActive) { throw new AppError("Seller not active") };

  await sellerRepository.update(searchSeller.id, { isActive: false } );
};

export default deleteSellerService;
