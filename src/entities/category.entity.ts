import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { NameAlreadyExists } from "../validators/categories";

@Entity()
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
}
