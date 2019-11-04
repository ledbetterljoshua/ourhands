import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { User } from "../../../entity/User";
// import { isAuthenticated } from "../../shared/isAuthenticated";

const isAuthenticated = (viewer: User | undefined, item: Post) => {
  if (!viewer || !viewer.confirmed || viewer.accountLocked) {
    return false;
  }
  if (viewer.id !== item.ownerId) {
    return false;
  }
  return true;
};

export const userDoesNotExistError = {
  path: "user",
  message: "does not exist"
};
export const postDoesNotExistError = {
  path: "post",
  message: "not found"
};
export const userNotAuthorizedError = {
  path: "user",
  message: "is not authorized"
};
export const successObject = {
  path: "success",
  message: "post deleted"
};

export const resolvers: ResolverMap = {
  Mutation: {
    deletePost: async (_, { id }, { viewer }) => {
      if (!viewer) {
        throw Error("Unauthorized");
      }

      const post = await Post.findOne({ where: { id } });

      if (!post) {
        throw Error("Not Found");
      }

      if (!isAuthenticated(viewer, post)) {
        throw Error("Unauthorized");
      }

      await Post.remove(post);

      return [successObject];
    }
  }
};
