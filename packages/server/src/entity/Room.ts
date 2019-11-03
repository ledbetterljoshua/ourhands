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
import { Post } from "./Post";
import { Domain } from "./Domain";

@Entity("rooms")
export class Room extends BaseEntity {
  @OneToMany(() => Post, post => post.room, {
    cascade: true,
    onDelete: "CASCADE"
  })
  posts: Post[];

  @ManyToOne(() => User, user => user.rooms)
  owner: User;

  @ManyToOne(() => Domain, domain => domain.rooms)
  domain: Domain;

  @PrimaryGeneratedColumn("uuid") id: string;
  @Column("uuid") ownerId: string;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("varchar", { length: 10000, nullable: true })
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: string;
}
