import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import Category from "./category.entity";
import { Seller } from "./seller.entity";

@Entity("products")
export class Products {
    @PrimaryColumn("uuid")
    readonly id: string

    @Column({length : 100, unique : true})
    name: string

    @Column('float')
    price: number

    @Column()
    stock: number

    @Column({length : 256})
    description: string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt: Date
    
    @Column()
    isActive: boolean

    @ManyToOne(() => Seller, { eager: true })
    seller: Seller

    @ManyToOne(() => Category, { eager: true })
    category: Category

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
