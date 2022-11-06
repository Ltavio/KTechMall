import AppDataSource from "../../data-source";
import Order_Product from "../../entities/orderProduct.entity";
import AppError from "../../errors/appErrors";

const softDeleteOrderProductService = async(id:string):Promise<void> =>{
  const orderProductRepository = AppDataSource.getRepository(Order_Product)
  const orderProduct = orderProductRepository.findOneBy({id})

  if(!orderProduct){throw new AppError("Order Product not found") };

  await orderProductRepository.delete(id)
};

export default softDeleteOrderProductService;