import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("payment")
export default class Payment {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({type:"decimal",precision:8, scale:2})  
  sub_total: number

  @CreateDateColumn({ type: "date" })
  createdAt: Date

  @Column({default: true})
  done: boolean
};