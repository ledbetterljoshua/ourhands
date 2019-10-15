import * as bcrypt from "bcryptjs";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany
} from "typeorm";
import { v4 } from "uuid";
import { Post } from "./Post";

@Entity("users")
export class User extends BaseEntity {
  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("text")
  password: string;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column("boolean", { default: false })
  accountLocked: boolean;

  @Column("text", { default: "", nullable: true })
  accountLockedReason: string;

  @BeforeInsert()
  async setId() {
    this.id = v4();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
