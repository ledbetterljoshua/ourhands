/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCommentMutation
// ====================================================

export interface DeleteCommentMutation_deleteComment {
  __typename: "PostResponse";
  path: string;
  message: string;
}

export interface DeleteCommentMutation {
  deleteComment: DeleteCommentMutation_deleteComment[];
}

export interface DeleteCommentMutationVariables {
  id: string;
  isReply?: boolean | null;
}
