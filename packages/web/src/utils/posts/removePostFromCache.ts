import { postsQuery } from "@ourhands/controller";
import { DataProxy } from "apollo-cache";

export const removePostFromCache = (cache: DataProxy) => (id: string) => {
  const data = cache.readQuery({
    query: postsQuery,
    variables: { range: "THIS_WEEK" }
  }) as any;
  const { findPosts: posts } = data;
  //find index of post from id
  const ndx = posts.findIndex((l: any) => l.id === id);
  delete posts[ndx];
  cache.writeQuery({
    query: postsQuery,
    variables: { range: "THIS_WEEK" },
    data: { findPosts: posts.filter(Boolean) }
  });
};
