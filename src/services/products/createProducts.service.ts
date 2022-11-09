import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Product from "../../entities/products.entity";
import Category from "../../entities/category.entity";
import Seller from "../../entities/seller.entity";

import { IProductResponse, IProductRequest } from "../../interfaces/products";

const createProductService = async (
    productData:IProductRequest):Promise<IProductResponse> => {
  const productRepository = AppDataSource.getRepository(Product);
  const sellerRepository = AppDataSource.getRepository(Seller);
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({ id: productData.categoryId });
  const seller = await sellerRepository.findOneBy({ id: productData.sellerId });
  const productSearch = await productRepository.findOneBy({ name: productData.name });

  if(productSearch){ throw new AppError("Product already exists", 409) };
  if(!category){ throw new AppError("Category not found", 400) };
  if(!seller){ 
    throw new AppError("You can only create products if you are a seller", 400)
  };

  const newProduct = productRepository.create({
    ...productData,
    seller,
    category
  });
  
  await productRepository.save(newProduct);
  
  return {
    message: "Created product",
    data: newProduct
  };
};

export default createProductService;