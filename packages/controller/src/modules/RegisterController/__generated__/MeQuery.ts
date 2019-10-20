/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_posts {
  __typename: "Post";
  id: string;
  title: string;
  details: string | null;
  upvoted: boolean;
  upvoteCount: number;
  createdAt: string | null;
}

export interface MeQuery_me {
  __typename: "User";
  id: string;
  email: string;
  posts: MeQuery_me_posts[];
}

export interface MeQuery {
  me: MeQuery_me | null;
}
