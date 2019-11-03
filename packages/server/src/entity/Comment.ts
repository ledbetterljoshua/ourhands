import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity("comments")
export class Comment extends BaseEntity {
  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @ManyToOne(() => User, user => user.comments)
  owner: User;

  @PrimaryGeneratedColumn("uuid") id: string;
  @Column("uuid", { nullable: true }) postId: string;
  @Column("uuid") userId: string;
  @Column("varchar", { length: 1000 })
  text: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}
