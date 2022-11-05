import AppDataSource from "../../data-source";
import { Seller } from "../../entities/seller.entity";
import AppError from "../../errors/appErrors";
import { ISellerUpdate } from "../../interfaces/seller";

const updatedSellerService = async (
  data: ISellerUpdate,
  id: string
): Promise<Seller> => {
  const sellerRepository = AppDataSource.getRepository(Seller);

  const searchSeller = await sellerRepository.findOne({
    where: {
      user: {
        id,
      },
    },
  });

  if (!searchSeller) {
    throw new AppError("Seller not found", 404);
  }

  const { companyName, cnpj } = data;

  await sellerRepository.update(searchSeller.id, {
    companyName: companyName ? companyName : searchSeller.companyName,
    cnpj: cnpj ? cnpj : searchSeller.cnpj,
  });

  const seller = await sellerRepository.findOneBy({
    id: searchSeller.id,
  });

  return seller!;
};

export default updatedSellerService;
