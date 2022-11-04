import AppDataSource from "../../data-source";
import { Products } from "../../entities/products";

const listProductsService = async () : Promise<Products[]> => { 
    const productRepository = AppDataSource.getRepository(Products);
    const products = await productRepository.find();

    return products;
}

export default listProductsService;