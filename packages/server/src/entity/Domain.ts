import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { Room } from "./Room";

@Entity("domain")
export class Domain extends BaseEntity {
  @OneToMany(() => Post, post => post.domain)
  posts: Post[];

  @OneToMany(() => User, user => user.domain)
  users: User[];

  @OneToMany(() => Room, room => room.domain)
  rooms: Room[];

  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 1000 })
  name: string;
}
