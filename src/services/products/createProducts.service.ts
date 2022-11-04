import { stringify } from "querystring";
import AppDataSource from "../../data-source";
import { Products } from "../../entities/products";
import AppError from "../../errors/appErrors";
import { IProductRequest } from "../../interfaces/products";

const createProductService = async ({
  name,
  category_id,
  seller_id,
  price,
  stock,
  description,
}: IProductRequest) => {
  const productRepository = AppDataSource.getRepository(Products);
  const categoryIdSearch = await productRepository.findOneBy({
    id: category_id,
  });
  const productIdSearch = productRepository.findOne({ where: { name: name } });
  const sellerIdSearch = await productRepository.findOneBy({ id: seller_id });
  // const productSearch = await productRepository.findOneBy({product : address});

  //   if(productIdSearch){
  //     throw new AppError("Product already exists" ,400 )
  //   }

  if (!sellerIdSearch) {
    throw new AppError("Seller does not exist", 400);
  }

  const newProduct = productRepository.create({
    name,
    // category_id,
    // seller_id,
    price,
    stock,
    description,
    isActive: true,
  });

  await productRepository.save(newProduct);

  return newProduct;
};

export default createProductService;
