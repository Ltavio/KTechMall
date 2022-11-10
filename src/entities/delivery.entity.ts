import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Addresses from "./addresses.entity";

@Entity("delivery")
export default class Delivery {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(()=> Addresses,  {eager:true})
  address: Addresses

  @Column({ default: true })
  delivery: boolean;

  @Column({ length: 100 })
  receiver: string;

  @CreateDateColumn({ type: "date" })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  readonly updatedAt: Date;

  @OneToOne(() => Addresses, {
    eager: true,
  })
  @JoinColumn()
  adress: Addresses;
}