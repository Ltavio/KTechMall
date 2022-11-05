import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150, unique: true })
  @IsEmail()
  email: string;

  @Column()
  cellphone: number;

  @Column({ length: 150 })
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdm: boolean;

  @CreateDateColumn({ type: "date" })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  readonly updatedAt: Date;
}
