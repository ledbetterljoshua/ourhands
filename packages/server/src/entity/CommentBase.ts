import {
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

export class CommentBase extends BaseEntity {
  @ManyToOne(() => Post, post => post.comments, {
    cascade: true,
    onDelete: "CASCADE"
  })
  post: Post;

  @ManyToOne(() => User, user => user.comments, {
    cascade: true,
    onDelete: "CASCADE"
  })
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

  @Column("boolean", { default: false })
  userIsPublic: boolean;
}
