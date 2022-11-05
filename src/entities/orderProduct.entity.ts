import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Products } from "./products.entity";
import { User } from "./user.entity";

@Entity("order_product")
class Order_Product {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column()
  quantity: number

  @Column({type: "decimal", precision:8, scale:2})
  price_product: number

  @Column({type:"decimal", precision:8, scale:2})
  price_total_products: number

  @CreateDateColumn({type: "date"})
  createdAt: Date
  
  @UpdateDateColumn({type: "date"})
  updatedAt: Date

  @ManyToOne(()=> User, {eager: true})
  user: User

  @ManyToOne(()=> Products, {eager:true})
  product: Products
};

export default Order_Product;