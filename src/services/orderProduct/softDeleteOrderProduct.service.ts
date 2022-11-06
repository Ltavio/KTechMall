import AppDataSource from "../../data-source";
import AppError from "../../errors/appErrors";
import Order_Product from "../../entities/orderProduct.entity";

const softDeleteOrderProductService = async(id:string):Promise<void> =>{
  const orderProductRepository = AppDataSource.getRepository(Order_Product);
  const orderProduct = orderProductRepository.findOneBy({id});

  if(!orderProduct){throw new AppError("Order Product not found") };

  await orderProductRepository.delete(id);
};

export default softDeleteOrderProductService;