import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 } from "uuid";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity("users")
export class User extends BaseEntity {
  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @PrimaryGeneratedColumn("uuid") id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;

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
