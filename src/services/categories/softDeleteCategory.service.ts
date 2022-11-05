import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import { ICategory } from "../../interfaces/categories";

const softDeleteCategoryService = async (id: string): Promise<void> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  await categoryRepository.update({ id }, { isActive: false });
};

export default softDeleteCategoryService;
