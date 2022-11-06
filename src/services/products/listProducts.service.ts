import AppDataSource from "../../data-source";
import Product from "../../entities/products.entity";

import { IListProducsResponse } from "../../interfaces/products";

const listProductsService = async () : Promise<IListProducsResponse> => { 
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();

    return {
        message: "listed all products",
        data: products
    };
};

export default listProductsService;