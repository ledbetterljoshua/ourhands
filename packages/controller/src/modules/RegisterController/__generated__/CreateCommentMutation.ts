/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCommentMutation
// ====================================================

export interface CreateCommentMutation_createComment_comment {
  __typename: "Comment";
  parentId: string | null;
  text: string;
  id: string;
}

export interface CreateCommentMutation_createComment {
  __typename: "CommentResponse";
  path: string;
  message: string;
  comment: CreateCommentMutation_createComment_comment | null;
}

export interface CreateCommentMutation {
  createComment: CreateCommentMutation_createComment[] | null;
}

export interface CreateCommentMutationVariables {
  text: string;
  parentId?: string | null;
  postId?: string | null;
}
