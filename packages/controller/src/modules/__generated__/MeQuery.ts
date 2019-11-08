/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_domain_rooms_owner {
  __typename: "User";
  email: string | null;
}

export interface MeQuery_me_domain_rooms {
  __typename: "Room";
  isOwner: boolean;
  owner: MeQuery_me_domain_rooms_owner;
  title: string;
  id: string;
}

export interface MeQuery_me_domain {
  __typename: "Domain";
  id: string;
  name: string;
  rooms: MeQuery_me_domain_rooms[] | null;
}

export interface MeQuery_me {
  __typename: "User";
  id: string | null;
  email: string | null;
  domain: MeQuery_me_domain | null;
}

export interface MeQuery {
  me: MeQuery_me | null;
}
