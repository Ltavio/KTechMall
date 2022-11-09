import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity("delivery")
export default class Delivery {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 100 })
  address_id: string;

  @Column({ default: true })
  delivery: boolean;

  @Column({ length: 100 })
  receiver: string;

  @CreateDateColumn({ type: "date" })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  readonly updatedAt: Date;

  // @OneToOne(() => Adress, {
  //   eager: true,
  // })
  // @JoinColumn()
  // adress: Adress;
}
