import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import  Product  from "./products.entity";
import  User  from "./user.entity";

import { v4 as uuid } from "uuid";

@Entity("sellers")
export default class Seller {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 150, unique: true })
  companyName: string;

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @OneToOne(() => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @OneToMany(()=> Product, products => products.seller)
  products: Product[]


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
