import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appErrors";
import { ICartList } from "../../interfaces/cart";


const listCartService = async (userId : string) : Promise<ICartList> => { 
    const cartRepository = AppDataSource.getRepository(Cart);
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({id : userId})
    const cartProducts = await cartRepository.find({relations : {user : true}})

    if (!user){
        throw new AppError("User not found")
    }
    if (!cartProducts){
        throw new AppError("Cart not found")
    }

    return {
        message: "listed all orders products",
        data: cartProducts
    };
};

export default listCartService;