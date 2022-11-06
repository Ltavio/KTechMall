import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Category from "../../entities/category.entity";

import { ICategoryRequest, ICreateCategoryResponse } from "../../interfaces/categories";
import { validate } from "class-validator";

const createCategoryService = async ({ 
    name, 
    description,}:ICategoryRequest):Promise<ICreateCategoryResponse> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const newCategory = categoryRepository.create({ name, description });

  const errors = await validate(newCategory);

  if (errors.length > 0) { throw new AppError("Category already exists", 409) };

  await categoryRepository.save(newCategory);

  return {
    message: "create Category",
    data: newCategory
  };
};

export default createCategoryService;