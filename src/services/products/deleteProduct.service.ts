import AppDataSource from "../../data-source";
import { Product } from "../../entities/products.entity";
import AppError from "../../errors/appErrors";


const deleteProductService = async ( id : string): Promise<any> => { 
    const productRepository = AppDataSource.getRepository(Product);

    const findProduct = await productRepository.findOneBy({ id });

    if(!findProduct){ throw new AppError("Product not found" ,400) };
    if(findProduct.isActive === false){ 
        throw new AppError("Product already deleted" , 400) };
    
    findProduct.isActive = false;

    await productRepository.save(findProduct);
    
    const message = { 
        message: "Product disabled",
        statusCode: 200
    }

    return message;
}

export default deleteProductService;