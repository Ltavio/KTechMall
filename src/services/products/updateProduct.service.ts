import AppDataSource from "../../data-source";
import { Products } from "../../entities/products";
import AppError from "../../errors/appErrors";
import { IProductUpdate } from "../../interfaces/products";

const updateProductService = async (
  { name, price, stock, description }: IProductUpdate,
  id: string
): Promise<Products | Array<string | number>> => {
  const productsRepository = AppDataSource.getRepository(Products);

  const findProduct = await productsRepository.findOneBy({
    id,
  });

  if (!findProduct) {
    throw new AppError("Product does not exist", 404);
  }

  await productsRepository.update(id, {
    name: name ? name : findProduct.name,
    price: price ? price : findProduct.price,
    stock: stock ? stock : findProduct.stock,
    description: description ? description : findProduct.description,
  });

  const product = await productsRepository.findOneBy({
    id,
  });

  return product!;
};

export default updateProductService;
