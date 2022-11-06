import { Request, Response } from "express";
import { Product } from "../entities/products.entity";
import { IProductUpdate } from "../interfaces/products";
import createProductService from "../services/products/createProducts.service";
import deleteProductService from "../services/products/deleteProduct.service";
import listOneProductService from "../services/products/listOneProduct.service";
import listProductsService from "../services/products/listProducts.service";
import updateProductService from "../services/products/updateProduct.service";
import { instanceToPlain } from "class-transformer";

export const createProductController = async (req: Request, res: Response) => {
  const productData = req.body
  const response = await createProductService(productData)

  return res.status(201).json(instanceToPlain(response))
};

export const deleteProductController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const deletedProducts = await deleteProductService(id);
  if (deletedProducts instanceof Product) {
    return res.json(deletedProducts);
  }
  return res.status(204).json({
    message: "User deleted with sucess!",
  });
};

export const listProductController = async (req: Request, res: Response) => {
    const response = await listProductsService()
    return res.status(200).json(instanceToPlain(response));
};

export const updateProductController = async (req: Request, res: Response) => {
    const requestData : IProductUpdate = req.body
    const id: string = req.params.id
    const response = await updateProductService(requestData, id)
    if(response instanceof Product){
        return res.json(response)
    }
    return res.status(201).json( instanceToPlain(response));
};

export const listOneProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await  listOneProductService(id)
    return res.status(200).json(instanceToPlain(response));
};


