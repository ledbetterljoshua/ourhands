import {
  PostsQuery_findPosts,
  PostsQuery_findPosts_owner
} from "@ourhands/controller/dist/modules/__generated__/PostsQuery";

export interface postBuilderProps {
  id: string;
  title: string;
  details: string;
  owner: PostsQuery_findPosts_owner;
}

export const buildPost = ({
  id,
  title,
  details,
  owner
}: postBuilderProps): PostsQuery_findPosts => ({
  id,
  title,
  owner,
  details,
  upvoted: true,
  upvoteCount: 1,
  isOwner: true,
  createdAt: String(Date.now()),
  commentCount: 0,
  __typename: "Post"
});
