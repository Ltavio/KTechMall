import { IDelivery } from "../delivery"
import { IOrderProduct, IOrderProductResponse } from "../order_product"
import { IUser } from "../user"

export interface ICart { 
    id : string
    user : IUser
    delivery: IDelivery
    sub_total_orders : number
    frete : number
    price_total : number
};

export interface ICartRequest { 
    userId : string
    deliveryId : string
    sub_total_orders : number
    frete : number
    price_total : number
};

export interface ICartResponse {
    message: string,
    data: ICart
};

export interface ICartList { 
    message: string,
    data: ICart[]
}
