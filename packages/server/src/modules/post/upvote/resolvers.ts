import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { Upvote } from "../../../entity/Upvote";

export const upvoteSuccessObject = {
  path: "success",
  message: "post upvoted"
};
export const upvoteRemoveSuccessObject = {
  path: "success",
  message: "upvote removed"
};

export const resolvers: ResolverMap = {
  Post: {
    upvoteCount: async post => {
      return (post.upvotes && post.upvotes.length) || 0;
    },
    upvoted: async (post, _, { viewer }) => {
      if (!post.upvotes) return false;

      const getUpvoted = (vote: Upvote) => {
        if (!vote || !viewer) return;
        return vote.userId === viewer.id;
      };

      const userUpvoted = post.upvotes.map(getUpvoted);
      return Boolean(userUpvoted.filter(Boolean).length);
    }
  },
  Mutation: {
    upvotePost: async (_, { id }, { viewer }) => {
      if (!viewer) {
        return null;
      }

      const getUpvote = async (postId: string) =>
        await Upvote.findOne({
          where: { userId: viewer.id, postId }
        });

      const getPost = async (id: string) =>
        await Post.findOne({ where: { id }, relations: ["upvotes"] });

      const post = await getPost(id);

      if (!post) {
        return null;
      }

      const vote = await getUpvote(post.id);

      if (vote) {
        await Upvote.remove(vote);
        return await getPost(post.id);
      }

      await Upvote.create({
        userId: viewer.id,
        postId: post.id
      }).save();
      return await getPost(post.id);
    }
  }
};
