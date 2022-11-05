import AppDataSource from "../../data-source"
import Order_Product from "../../entities/orderProduct.entity"

const listOrdersProductService = async()=>{
  const orderProductRepository = AppDataSource.getRepository(Order_Product)
  const ordersProduct = await orderProductRepository.find()

  return {
    message: "Listed order_products",
    data: ordersProduct
  }
}

export default listOrdersProductService;