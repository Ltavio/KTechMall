import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Product from "../../entities/products.entity";

import { IProductResponse, IProductUpdate } from "../../interfaces/products";

const updateProductService = async (
  requestData:IProductUpdate,
  id: string):Promise<IProductResponse> => {
  const productsRepository = AppDataSource.getRepository(Product);
  const findProduct = await productsRepository.findOneBy({ id });
  const findProductSameName = await productsRepository.findOneBy({ name: requestData.name })
  
  if(requestData.name && findProductSameName){
    throw new AppError("This product already exists", 409);
    
  }
  if (!findProduct) {

    throw new AppError("Product does not exist", 404) };

  const newProduct = {
    ...findProduct,
    ...requestData
  }
  
  await productsRepository.update(id, newProduct);

  const product = await productsRepository.findOneBy({ id });

  return {
    message: "Updated product",
    data: product!
  };
};

export default updateProductService;