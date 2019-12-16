import { buildComment } from "./buildComment";
import { commentsQuery } from "@ourhands/controller";
import { DataProxy } from "apollo-cache";

interface Props {
  id: string;
  parentId: string;
  postId: string;
  text: string;
}

export const addCommentToCache = (cache: DataProxy, me: any) => ({
  id,
  parentId,
  postId,
  text
}: Props) => {
  console.log("postId1", postId);
  const { findComments: comments } = cache.readQuery({
    query: commentsQuery,
    variables: { postId }
  }) as any;
  let updatedComments = comments;
  if (parentId) {
    const commentIndex = comments.findIndex(({ id }: any) => id === parentId);
    const comment = comments[commentIndex];
    const newComment = {
      ...comment,
      replies: [...comment.replies, buildComment({ id, text, parentId, me })]
    };

    updatedComments[commentIndex] = newComment;
  } else {
    const newComment = buildComment({ id, text, me });
    updatedComments = [...comments, newComment];
  }
  console.log("postId", postId);
  cache.writeQuery({
    query: commentsQuery,
    variables: { postId: postId, parentId: parentId },
    data: { findComments: updatedComments }
  });
};
