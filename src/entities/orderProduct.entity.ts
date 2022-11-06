import { 
  Entity,
  PrimaryGeneratedColumn,
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne
} from "typeorm";
import  Product  from "./products.entity";
import  User  from "./user.entity";

@Entity("orders_product")
export default class Order_Product {
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

  @ManyToOne(()=> Product, {eager:true})
  product: Product
};