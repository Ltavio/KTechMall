import AppDataSource from "../../data-source"
import Order_Product from "../../entities/orderProduct.entity"

import { IListOrderProductResponse } from "../../interfaces/order_product"

const listOrdersProductService = async():Promise<IListOrderProductResponse>=>{
  const orderProductRepository = AppDataSource.getRepository(Order_Product);
  const ordersProduct = await orderProductRepository.find();

  return {
    message: "Listed orders_product",
    data: ordersProduct
  };
};

export default listOrdersProductService;