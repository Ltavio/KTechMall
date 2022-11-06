import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import Category from "./category.entity";
import Order_Product from "./orderProduct.entity";
import { Seller } from "./seller.entity";

@Entity("products")
export class Product {
    @PrimaryColumn("uuid")
    readonly id: string

    @Column({length : 100, unique : true})
    name: string

    @Column({type:"decimal", precision:12, scale:2})
    price: number

    @Column()
    stock: number

    @Column({length : 256})
    description: string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt: Date
    
    @Column({default: true})
    isActive: boolean

    @ManyToOne(() => Seller, { eager: true })
    seller: Seller

    @ManyToOne(() => Category, { eager: true })
    category: Category

    @OneToMany(()=> Order_Product, orders_product => orders_product.product)
     orders_product: Order_Product[]

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
