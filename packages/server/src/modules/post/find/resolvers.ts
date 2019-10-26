import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { Upvote } from "../../../entity/Upvote";
import { getConnection } from "typeorm";

const fieldSorter = (fields: any) => (a: any, b: any) =>
  fields
    .map((o: any) => {
      let dir = 1;
      if (o[0] === "-") {
        dir = -1;
        o = o.substring(1);
      }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
    })
    .reduce((p: any, n: any) => (p ? p : n), 0);

export const resolvers: ResolverMap = {
  Post: {
    upvoteCount: async post => {
      return (post.upvotes && post.upvotes.length) || 0;
    },
    upvoted: async (post, _, { viewer }) => {
      const getUpvoted = (vote: Upvote) => {
        if (!vote || !viewer) return;
        return (vote.userId = viewer.id);
      };
      if (!post.upvotes) return false;
      const userUpvoted = post.upvotes.map(getUpvoted);
      return Boolean(userUpvoted.length);
    },
    user: async (post, __, { viewer, userLoader }) => {
      const isMine = viewer && post.user.id === viewer.id;
      return isMine ? userLoader.load(post!.user.id) : null;
    }
  },
  Query: {
    findPosts: async (_, __, { viewer }) => {
      if (!viewer) return [];
      const posts = await getConnection()
        .createQueryBuilder()
        .select("post")
        .from(Post, "post")
        .leftJoinAndSelect("post.user", "user")
        .leftJoinAndSelect("post.upvotes", "upvote")
        .where("user.domain = :domain", { domain: viewer!.domain })
        .getMany();

      return posts.sort(fieldSorter(["-upvotecount", "-createdAt"]));
    }
  }
};
