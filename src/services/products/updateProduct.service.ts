import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Product from "../../entities/products.entity";

import { IProductResponse, IProductUpdate } from "../../interfaces/products";

const updateProductService = async (
  { name, price, stock, description }:IProductUpdate,
  id: string):Promise<IProductResponse> => {
  const productsRepository = AppDataSource.getRepository(Product);
  const findProduct = await productsRepository.findOneBy({ id });

  if (!findProduct) { throw new AppError("Product does not exist", 404) };

  await productsRepository.update(id, {
    name: name ? name : findProduct.name,
    price: price ? price : findProduct.price,
    stock: stock ? stock : findProduct.stock,
    description: description ? description : findProduct.description,
  });

  const product = await productsRepository.findOneBy({ id });

  return {
    message: "Updated product",
    data: product!
  };
};

export default updateProductService;