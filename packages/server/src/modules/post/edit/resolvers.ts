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

export const resolvers: ResolverMap = {
  Mutation: {
    editPost: async (
      _,
      { input: { id, title, details, viewability } },
      { viewer }
    ) => {
      if (!viewer) {
        throw Error("Unauthorized");
      }

      console.log("title", title);
      const post = await Post.findOne({ where: { id } });
      console.log("post", post);
      if (!post) {
        throw Error("Not Found");
      }

      if (!isAuthenticated(viewer, post)) {
        throw Error("Unauthorized");
      }

      if (typeof title === "string" && !title) {
        throw Error("title must exist");
      }

      const updated = await Post.update(
        { id },
        {
          title: title || post.title,
          details: typeof details === "string" ? details : post.details,
          userIsPublic: viewability
            ? viewability === "PUBLIC"
            : post.userIsPublic,
          ownerId: viewability
            ? viewability === "ANONYMOUS"
              ? undefined
              : viewer.id
            : post.ownerId
        }
      );

      console.log("updated", updated);

      return await Post.findOne({ where: { id } });
    }
  }
};
