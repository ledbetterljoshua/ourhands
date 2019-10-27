import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  RelationCount
} from "typeorm";
import { User } from "./User";
import { Upvote } from "./Upvote";
import { Comment } from "./Comment";

@Entity("posts")
export class Post extends BaseEntity {
  @ManyToOne(() => User, user => user.posts, {
    cascade: true,
    onDelete: "CASCADE"
  })
  user: User;

  @OneToMany(() => Upvote, upvote => upvote.post)
  upvotes: Upvote[];

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @RelationCount((post: Post) => post.upvotes, "upvotecount")
  upvotecount?: number;

  @PrimaryGeneratedColumn("uuid") id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("varchar", { length: 10000, nullable: true })
  details: string;

  @Column("uuid") userId: string;
}
