import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity("commentreplies")
export class CommentReply extends BaseEntity {
  @ManyToOne(() => User, user => user.comments, {
    cascade: true,
    onDelete: "CASCADE"
  })
  owner: User;

  @ManyToMany(() => Comment)
  @JoinTable()
  replies: Comment[];

  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("uuid", { nullable: true }) parentId: string;
  @Column("uuid") userId: string;
  @Column("varchar", { length: 1000 })
  text: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}
