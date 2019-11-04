import { Entity } from "typeorm";

import { CommentBase } from "./CommentBase";

@Entity("comments")
export class Comment extends CommentBase {}
