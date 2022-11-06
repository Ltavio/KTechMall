import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import { ICategory, IListCategoryResponse } from "../../interfaces/categories";

const listCategoriesService = async (): Promise<IListCategoryResponse> => {
  const categoriesRepository = AppDataSource.getRepository(Category);
  const categories = await categoriesRepository.find({ where: { isActive: true }});
  return {
    message: "Listed categories",
    data: categories
  };
};

export default listCategoriesService;