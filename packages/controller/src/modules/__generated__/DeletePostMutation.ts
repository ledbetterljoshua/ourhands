/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePostMutation
// ====================================================

export interface DeletePostMutation_deletePost {
  __typename: "PostResponse";
  path: string;
  message: string;
}

export interface DeletePostMutation {
  deletePost: DeletePostMutation_deletePost[];
}

export interface DeletePostMutationVariables {
  id: string;
}
