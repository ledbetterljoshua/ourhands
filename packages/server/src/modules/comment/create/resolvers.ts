import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Comment } from "../../../entity/Comment";
import { notAuthenticated } from "../../post/shared/errorMessages";
import { CommentReply } from "../../../entity/CommentReply";

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

export const resolvers: ResolverMap = {
  Mutation: {
    createComment: async (
      _,
      { input: { text, postId, parentId } },
      { viewer }
    ) => {
      // isAuthenticated(session);
      // const pictureUrl = picture ? await processUpload(picture) : null;
      if (!viewer || !isAuthenticated(viewer)) {
        return [notAuthenticatedError];
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

      return [{ ...successObject, comment }];
    }
  }
};
