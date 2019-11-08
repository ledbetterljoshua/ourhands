/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsQuery
// ====================================================

export interface PostsQuery_findPosts_owner {
  __typename: "User";
  id: string | null;
  email: string | null;
}

export interface PostsQuery_findPosts {
  __typename: "Post";
  id: string;
  title: string;
  details: string | null;
  createdAt: string | null;
  upvoteCount: number;
  commentCount: number;
  upvoted: boolean;
  owner: PostsQuery_findPosts_owner | null;
}

export interface PostsQuery {
  findPosts: (PostsQuery_findPosts | null)[] | null;
}

export interface PostsQueryVariables {
  range?: string | null;
}
