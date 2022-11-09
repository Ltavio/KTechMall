import { 
    Entity, 
    PrimaryColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany, 
    ManyToOne, 
    OneToOne,
    JoinColumn
} from "typeorm";
import Order_Product from "./orderProduct.entity";
import { v4 as uuid } from "uuid"
import User from "./user.entity";
import Delivery from "./delivey.entity";

@Entity("cart")
export default class Cart {
    @PrimaryColumn("uuid")
    readonly id: string

    @Column({type:"float"})
    sub_total_orders: number

    @Column({type:"float"})
    frete : number

    @Column({type:"float"})
    price_total: number

   @OneToMany(() => Order_Product, orders_product => orders_product.cart)
   orders_product: Order_Product[]

    @OneToOne(() => User, { eager: true })
    @JoinColumn()
    user: User

    @OneToOne(() => Delivery, { eager: true })
    @JoinColumn()
    delivery: Delivery

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
