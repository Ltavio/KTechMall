import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("products")
export class Products {
    @PrimaryColumn("uuid")
    readonly id: string

    @Column({length : 100})
    name: string
    @Column()
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

    // @ManyToOne((type) => Category, {
    //     eager: true
    // })@JoinColumn()
    // category_id: Category

    // @OneToOne((type) => Seller, {
    //     eager: true
    // })@JoinColumn()
    // seller_id: Seller

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
