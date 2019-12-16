import { buildPost, postBuilderProps } from "./buildPost";
import { postsQuery } from "@ourhands/controller";
import { DataProxy } from "apollo-cache";

export const addPostToCache = (cache: DataProxy) => (
  props: postBuilderProps
) => {
  const data = cache.readQuery({
    query: postsQuery,
    variables: { range: "THIS_WEEK" }
  }) as any;
  const { findPosts: posts } = data;
  const newPost = buildPost(props);
  cache.writeQuery({
    query: postsQuery,
    variables: { range: "THIS_WEEK" },
    data: { findPosts: [newPost, ...posts] }
  });
};
