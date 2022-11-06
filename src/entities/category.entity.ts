import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { NameAlreadyExists } from "../validators/categories";
import { Product } from "./products.entity";

@Entity("categories")
export default class Category {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 100, unique: true })
  @NameAlreadyExists({})
  name: string;

  @Column({ length: 256 })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(()=> Product, products => products.category)
  products: Product[]
}
