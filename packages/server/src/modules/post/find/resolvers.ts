import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { Upvote } from "../../../entity/Upvote";
import { getConnection } from "typeorm";
import { fieldSorter } from "../../../utils/fieldSorter";

export const resolvers: ResolverMap = {
  Post: {
    commentCount: async post => {
      return (post.comments && post.comments.length) || 0;
    },
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
        .leftJoinAndSelect("post.comments", "comment")
        .leftJoinAndSelect("post.upvotes", "upvote")
        .where("user.domain = :domain", { domain: viewer!.domain })
        .getMany();

      return posts.sort(fieldSorter(["-upvotecount", "-createdAt"]));
    }
  }
};
