import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";

import Product from "../../entities/products.entity";

import { IProductResponse } from "../../interfaces/products";

const listOneProductService = async (id : string):Promise<IProductResponse>=> { 
    const productRepository = AppDataSource.getRepository(Product);
    const productSearch = await productRepository.findOne({ where:{id : id} } );

    if(!productSearch){ throw new AppError("Product already exists", 404) };

    return {
        message: "Listed product",
        data: productSearch
    };
};

export default listOneProductService;