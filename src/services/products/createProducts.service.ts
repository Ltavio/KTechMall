import { stringify } from "querystring";
import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import { Products } from "../../entities/products.entity";
import { Seller } from "../../entities/seller.entity";
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
  const sellerRepository = AppDataSource.getRepository(Seller)
  const categoryRepository = AppDataSource.getRepository(Category)
  const category = await categoryRepository.findOneBy({
    id: category_id,
  });


  const seller = await sellerRepository.findOneBy({ id: seller_id });
  const productSearch = await productRepository.findOneBy({ name: name });

  if (productSearch) {
    throw new AppError("Product already exists", 400);
  }

  if (!seller) {
    throw new AppError("You can only create products if you are a seller", 400);
  }

  if (!category) {
    throw new AppError("Category already exists", 400);
  }

  const newProduct = productRepository.create({
    name,
    category,
    seller,
    price,
    stock,
    description,
    isActive: true,
  });

  await productRepository.save(newProduct);
  
  return newProduct;
};

export default createProductService;
