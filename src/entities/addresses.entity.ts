import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import Delivery from "./delivery.entity";
import User from "./user.entity";

@Entity("Addresses")
export default class Addresses {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 150 })
  state: string;

  @Column({ length: 150 })
  city: string;

  @Column({ length: 150 })
  zipCode: string;

  @Column({ length: 150 })
  district: string;

  @Column({ length: 150 })
  road: string;

  @Column({ length: 50 })
  number: string;

  @Column({ length: 150, nullable: true })
  complement: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @ManyToMany((type) => User, {
    eager: true,
  })
  @JoinTable()
  user: User[];

  @OneToMany(() => Delivery, (Delivery) => Delivery.adress)
  Delivery: Delivery[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}