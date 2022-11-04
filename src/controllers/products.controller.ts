import { Request, Response } from "express";
import { Products } from "../entities/products";
import { IProductUpdate } from "../interfaces/products";
import createProductService from "../services/products/createProducts.service";
import deleteProductService from "../services/products/deleteProduct.service";
import listOneProductService from "../services/products/listOneProduct.service";
import listProductsService from "../services/products/listProducts.service";
import updateProductService from "../services/products/updateProduct.service";

export const createProductController = async (req: Request, res: Response) => {
  const body = req.body;
  const product = await createProductService(body);
  return res.status(201).json(product);
};

export const deleteProductController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const deletedProducts = await deleteProductService(id);
  if (deletedProducts instanceof Products) {
    return res.json(deletedProducts);
  }
  return res.status(deletedProducts[1] as number).json({
    message: deletedProducts[0],
  });
};

export const listProductController = async (req: Request, res: Response) => {
    const products = await listProductsService()
    return res.status(200).json(products);
};

export const updateProductController = async (req: Request, res: Response) => {
    const product : IProductUpdate = req.body
    const id: string = req.params.id
    const updateProduct = await updateProductService(product, id)
    if(updateProduct instanceof Products){
        return res.json(updateProduct)
    }
    return res.status(200).json(updateProduct)
};

export const listOneProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await  listOneProductService(id)
    return res.status(200).json(product);
};
