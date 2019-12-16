import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Post } from "../../../entity/Post";
import { Comment } from "../../../entity/Comment";
import { notAuthenticated } from "../../post/shared/errorMessages";
import { CommentReply } from "../../../entity/CommentReply";
import { PubSub } from "graphql-subscriptions";

export const notAuthenticatedError = {
  post: null,
  path: "authentication",
  message: notAuthenticated
};
export const successObject = {
  post: null,
  path: "create post",
  message: "success!"
};

const isAuthenticated = (viewer: User | undefined) => {
  if (!viewer || !viewer.confirmed || viewer.accountLocked) {
    return false;
  }
  return true;
};

export const pubsub = new PubSub();

export const resolvers: ResolverMap = {
  Mutation: {
    createComment: async (
      _,
      { input: { text, postId, parentId } },
      { viewer }
    ) => {
      if (!viewer || !isAuthenticated(viewer)) {
        return [notAuthenticatedError];
      }

      const postInDb = await Post.findOne({ where: { id: postId } });
      console.log("postId", postId, postInDb);
      if (!postInDb) {
        throw Error("post does not exist");
      }

      let comment;
      if (parentId) {
        comment = await CommentReply.create({
          text,
          parentId,
          userId: viewer.id
        }).save();
      } else {
        comment = await Comment.create({
          text,
          postId,
          userId: viewer.id
        }).save();
      }

      // redis.lpush(listingCacheKey, JSON.stringify(listing));
      pubsub.publish("commentAdded", { commentAdded: comment });
      return [{ ...successObject, comment }];
    }
  }
};
