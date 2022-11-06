import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import  Product  from "./products.entity";

import { NameAlreadyExists } from "../validators/categories";

@Entity("categories")
export default class Category {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50, unique: true })
  @NameAlreadyExists({})
  name: string;

  @Column({ length: 256 })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @OneToMany(()=> Product, products => products.category)
  products: Product[]
}
