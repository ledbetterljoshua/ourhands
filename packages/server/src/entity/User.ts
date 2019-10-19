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

  @Column("varchar", { length: 255, nullable: true })
  domain: string;

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
}
