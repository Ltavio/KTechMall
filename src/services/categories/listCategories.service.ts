import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import { ICategory } from "../../interfaces/categories";

const listCategoriesService = async (): Promise<ICategory[]> => {
  const categoriesRepository = AppDataSource.getRepository(Category);
  const categories = await categoriesRepository.find({
    where: { isActive: true },
  });
  return categories;
};

export default listCategoriesService;
