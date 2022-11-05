import { Request, Response } from "express";
import { Products } from "../entities/products.entity";
import { IProductUpdate } from "../interfaces/products";
import createProductService from "../services/products/createProducts.service";
import deleteProductService from "../services/products/deleteProduct.service";
import listOneProductService from "../services/products/listOneProduct.service";
import listProductsService from "../services/products/listProducts.service";
import updateProductService from "../services/products/updateProduct.service";
import { instanceToPlain } from "class-transformer";

export const createProductController = async (req: Request, res: Response) => {
  const requestData = req.body;
  const product = await createProductService(requestData);
  return res.status(201).json(product);
};

export const deleteProductController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const deletedProducts = await deleteProductService(id);
  if (deletedProducts instanceof Products) {
    return res.json(deletedProducts);
  }
  return res.status(204).json({
    message: "User deleted with sucess!",
  });
};

export const listProductController = async (req: Request, res: Response) => {
    const products = await listProductsService()
    return res.status(200).json(products);
};

export const updateProductController = async (req: Request, res: Response) => {
    const requestData : IProductUpdate = req.body
    const id: string = req.params.id
    const updateProduct = await updateProductService(requestData, id)
    if(updateProduct instanceof Products){
        return res.json(updateProduct)
    }
    return res.status(201).json({
      message: "Updated product",
      data: instanceToPlain(updateProduct),
    });
};

export const listOneProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await  listOneProductService(id)
    return res.status(200).json(product);
};


