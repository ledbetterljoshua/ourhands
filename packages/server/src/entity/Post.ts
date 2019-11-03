import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Upvote } from "./Upvote";
import { Comment } from "./Comment";
import { Domain } from "./Domain";
import { Room } from "./Room";

const cascade = {
  cascade: true,
  onDelete: "CASCADE"
};

@Entity("posts")
export class Post extends BaseEntity {
  @ManyToOne(() => User, user => user.posts, { nullable: true })
  owner: User;

  @ManyToOne(() => Room, room => room.posts)
  room: Room;

  @ManyToOne(() => Domain, domain => domain.posts)
  domain: Domain;

  @OneToMany(() => Upvote, upvote => upvote.post, cascade as any)
  upvotes: Upvote[];

  @OneToMany(() => Comment, comment => comment.post, cascade as any)
  comments: Comment[];

  @PrimaryGeneratedColumn("uuid") id: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: string;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("varchar", { length: 10000, nullable: true })
  details: string;

  @Column("boolean", { default: false })
  userIsPublic: boolean;

  @Column("uuid", { nullable: true }) ownerId: string;
}
