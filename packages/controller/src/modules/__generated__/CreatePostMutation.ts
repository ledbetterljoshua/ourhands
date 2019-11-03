/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePostMutation
// ====================================================

export interface CreatePostMutation_createPost_post {
  __typename: "Post";
  id: string;
}

export interface CreatePostMutation_createPost {
  __typename: "PostResponse";
  path: string;
  message: string;
  post: CreatePostMutation_createPost_post | null;
}

export interface CreatePostMutation {
  createPost: CreatePostMutation_createPost[] | null;
}

export interface CreatePostMutationVariables {
  title: string;
  details?: string | null;
  viewability?: string | null;
}
