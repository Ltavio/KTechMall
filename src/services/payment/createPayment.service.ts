import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import Order_Product from "../../entities/orderProduct.entity";
import Payment from "../../entities/payment.entity";
import Product from "../../entities/products.entity";
import AppError from "../../errors/appErrors";
import { IPaymentRequest, IPaymentResponse } from "../../interfaces/payment";

const createPaymentService = async(
  paymentData:IPaymentRequest,
  id:string  ): Promise<IPaymentResponse>=>{
  const paymentRepository = AppDataSource.getRepository(Payment)
  const cartRepository = AppDataSource.getRepository(Cart)
  const orderProductRepository = AppDataSource.getRepository(Order_Product)
  const productRepository = AppDataSource.getRepository(Product)

  const cart = await cartRepository.findOneBy({id})
  const ordersProduct = await orderProductRepository.find({where:{ cart:{ id: cart?.id }}})

    if(!cart){throw new AppError("Cart not found");
    }
    
    ordersProduct.forEach(async element => {
      const idProduct = element.product.id
      const product = await productRepository.findOne({where:{id:idProduct}})
      const stock = element.product.stock - element.quantity
      await productRepository.update(idProduct,{
        ...product,
        stock: stock
      })
    });
  
  const payment = paymentRepository.create({
    sub_total: cart.price_total,   
  })

  await paymentRepository.save(payment)

  return {
    message: "Payment done",
    data: payment
  }
};

export default createPaymentService;