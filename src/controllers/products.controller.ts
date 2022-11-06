import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import Product from "../entities/products.entity";

import createProductService from "../services/products/createProducts.service";
import deleteProductService from "../services/products/deleteProduct.service";
import listOneProductService from "../services/products/listOneProduct.service";
import listProductsService from "../services/products/listProducts.service";
import updateProductService from "../services/products/updateProduct.service";

const createProductController = async (req: Request, res: Response) => {
  const productData = req.body
  const response = await createProductService(productData)

  return res.status(201).json(instanceToPlain(response))
};

const deleteProductController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const response = await deleteProductService(id);
  if (response instanceof Product) {
    return res.json(response);
  }
  return res.status(204).json({
    message: "User deleted with sucess!",
  });
};

const listProductController = async (req: Request, res: Response) => {
    const response = await listProductsService()
    return res.status(200).json(instanceToPlain(response));
};

const updateProductController = async (req: Request, res: Response) => {
    const requestData = req.body
    const id: string = req.params.id
    const response = await updateProductService(requestData, id)
    if(response instanceof Product){
        return res.json(response)
    }
    return res.status(201).json( instanceToPlain(response));
};

const listOneProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await  listOneProductService(id)
    return res.status(200).json(instanceToPlain(response));
};

export { 
  createProductController,
  deleteProductController,
  listProductController,
  updateProductController,
  listOneProductController
}

