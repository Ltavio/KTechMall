import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";

@Entity("seller")
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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
