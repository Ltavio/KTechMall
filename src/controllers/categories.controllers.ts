import { Request, Response } from "express";

import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import softDeleteCategoryService from "../services/categories/softDeleteCategory.service";

const createCategoryController = async( 
    req:Request,
    res:Response ): Promise<Response> =>{
  const { name, description } = req.body;
  const response = await createCategoryService({ name, description });
  return res.status(201).json(response);
};

const listCategoriesController = async (
    req: Request,
    res: Response ): Promise<Response> => {
  const response = await listCategoriesService();
  return res.status(200).json(response);
};

const softDeleteCategoryController = async (
    req: Request,
    res: Response ): Promise<Response> => {
  const { id } = req.params;
  await softDeleteCategoryService(id);
  return res.status(204).end();
};

export { 
  createCategoryController, 
  listCategoriesController, 
  softDeleteCategoryController
}
