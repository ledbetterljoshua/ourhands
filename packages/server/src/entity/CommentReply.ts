import { Entity, Column, ManyToMany, JoinTable } from "typeorm";

import { Comment } from "./Comment";
import { CommentBase } from "./CommentBase";

@Entity("commentreplies")
export class CommentReply extends CommentBase {
  @ManyToMany(() => Comment)
  @JoinTable()
  replies: Comment[];

  @Column("uuid", { nullable: true }) parentId: string;
}
