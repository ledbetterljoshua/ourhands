import { ResolverMap } from "../../../types/graphql-utils";
import { Comment } from "../../../entity/Comment";
import { CommentReply } from "../../../entity/CommentReply";
import { User } from "../../../entity/User";
// import { isAuthenticated } from "../../shared/isAuthenticated";

const isAuthenticated = (
  viewer: User | undefined,
  item: Comment | CommentReply
) => {
  if (!viewer || !viewer.confirmed || viewer.accountLocked) {
    return false;
  }
  if (viewer.id !== item.userId) {
    return false;
  }
  return true;
};
export const userDoesNotExistError = {
  path: "user",
  message: "does not exist"
};
export const commentDoesNotExistError = {
  path: "comment",
  message: "not found"
};
export const userNotAuthorizedError = {
  path: "user",
  message: "is not authorized"
};
export const successObject = {
  path: "success",
  message: "comment deleted"
};

export const resolvers: ResolverMap = {
  Mutation: {
    deleteComment: async (_, { id, isReply }, { viewer }) => {
      if (!viewer) {
        return [userDoesNotExistError];
      }

      const Entity = isReply ? CommentReply : Comment;

      const comment = await Entity.findOne({ where: { id } });

      if (!comment) {
        return [commentDoesNotExistError];
      }

      if (!isAuthenticated(viewer, comment)) {
        console.log(
          `this user ${viewer.id} is trying to delete a post they don't own`
        );
        return [userNotAuthorizedError];
      }

      await Entity.remove(comment);

      return [successObject];
    }
  }
};
