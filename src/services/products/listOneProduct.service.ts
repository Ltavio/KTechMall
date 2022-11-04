import AppDataSource from "../../data-source";
import { Products } from "../../entities/products";
import AppError from "../../errors/appErrors";

const listOneProductService = async (id : string)  => { 
    const productRepository = AppDataSource.getRepository(Products);

    const productSearch = await productRepository.findOne({
        where : {id : id},
    });

    if(!productSearch){ 
        throw new AppError("Product already exists", 404)
    }

    return productSearch;

}

export default listOneProductService;