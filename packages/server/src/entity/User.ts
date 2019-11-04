import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { v4 } from "uuid";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Domain } from "./Domain";
import { Room } from "./Room";

@Entity("users")
export class User extends BaseEntity {
  @OneToMany(() => Post, post => post.owner, {
    cascade: true,
    onDelete: "CASCADE"
  })
  posts: Post[];

  @OneToMany(() => Room, room => room.owner, {
    cascade: true,
    onDelete: "CASCADE"
  })
  rooms: Room[];

  @OneToMany(() => Comment, comment => comment.owner)
  comments: Comment[];

  @ManyToOne(() => Domain, domain => domain.users, {
    cascade: true,
    onDelete: "CASCADE"
  })
  domain: Domain;

  @PrimaryGeneratedColumn("uuid") id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;

  @Column("varchar", { length: 255 })
  email: string;

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
