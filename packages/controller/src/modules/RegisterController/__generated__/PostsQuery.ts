/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsQuery
// ====================================================

export interface PostsQuery_findPosts_user {
  __typename: "User";
  email: string;
  domain: string | null;
}

export interface PostsQuery_findPosts {
  __typename: "Post";
  id: string;
  title: string;
  details: string;
  upvoteCount: number;
  upvoted: boolean;
  user: PostsQuery_findPosts_user | null;
}

export interface PostsQuery {
  findPosts: (PostsQuery_findPosts | null)[];
}
