import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { User } from "../../../entity/User";
import { notAuthenticated } from "../shared/errorMessages";
import { Upvote } from "../../../entity/Upvote";
import { Domain } from "../../../entity/Domain";

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

const PUBLIC = "PUBLIC";
const ANONYMOUS = "ANONYMOUS";

const isAuthenticated = (viewer: User | undefined) => {
  if (!viewer || !viewer.confirmed || viewer.accountLocked) {
    return false;
  }
  return true;
};

export const resolvers: ResolverMap = {
  Mutation: {
    createPost: async (
      _,
      { input: { title, details, viewability } },
      { viewer }
    ) => {
      if (!viewer || !isAuthenticated(viewer)) {
        throw Error("not authenticated");
      }

      const domain = viewer.domain.name;

      let domainInDb = await Domain.findOne({
        where: { name: domain },
        select: ["id"]
      });

      if (!domainInDb) {
        throw Error("no domain");
      }

      const post = await Post.create({
        title,
        details,
        userIsPublic: viewability === PUBLIC,
        ownerId: viewability === ANONYMOUS ? undefined : viewer.id,
        domain: domainInDb
      }).save();

      await Upvote.create({
        postId: post.id,
        userId: viewer.id
      }).save();

      // redis.lpush(listingCacheKey, JSON.stringify(listing));

      return [{ ...successObject, post }];
    }
  }
};
