import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Seller from "../../entities/seller.entity";

import { ISellerResponse, ISellerUpdate } from "../../interfaces/seller";

const updatedSellerService = async (
  data: ISellerUpdate,
  id: string
):Promise<ISellerResponse> => {
  const sellerRepository = AppDataSource.getRepository(Seller);
  const searchSeller = await sellerRepository.findOne({
    where: {
      user: {
        id,
      },
    },
  });

  if (!searchSeller) { throw new AppError( "Seller not found", 404 )};

  const { companyName, cnpj } = data;

  await sellerRepository.update(searchSeller.id, {
    companyName: companyName ? companyName : searchSeller.companyName,
    cnpj: cnpj ? cnpj : searchSeller.cnpj,
  });

  const seller = await sellerRepository.findOneBy({ id: searchSeller.id });

  return {
    message: "Updated seller",
    data: seller!
  };
};

export default updatedSellerService;
