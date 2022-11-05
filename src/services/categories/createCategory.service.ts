import { validate } from "class-validator";
import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import AppError from "../../errors/appErrors";
import { ICategory, ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({
  name,
  description,
}: ICategoryRequest): Promise<ICategory> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const newCategory = categoryRepository.create({ name, description });

  const errors = await validate(newCategory);

  if (errors.length > 0) {
    throw new AppError("Category already exists", 409);
  }

  await categoryRepository.save(newCategory);

  return newCategory;
};

export default createCategoryService;
