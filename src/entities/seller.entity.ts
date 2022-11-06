import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./products.entity";
import { User } from "./user.entity";

@Entity("sellers")
export class Seller {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 150, unique: true })
  companyName: string;

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((type) => User, {
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
