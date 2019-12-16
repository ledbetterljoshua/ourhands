import middleware from "./middleware";
import { createMiddleware } from "../../../utils/createMiddleware";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { checkIsOwner } from "../../../utils/checkIsOwner";
import {
  getCommentCount,
  getUpvoteCount,
  getUpvotedBool,
  getOwner
} from "../../post/find/resolvers";

export const resolvers: ResolverMap = {
  Post: {
    isOwner: checkIsOwner,
    commentCount: getCommentCount,
    upvoteCount: getUpvoteCount,
    upvoted: getUpvotedBool,
    owner: getOwner
  },
  Query: {
    me: createMiddleware(middleware, async (_, __, { viewer }) => {
      if (!viewer || !viewer.confirmed) {
        return null;
      }

      return User.findOne({
        where: {
          id: viewer!.id
        },
        join: {
          alias: "user",
          leftJoinAndSelect: {
            domain: "user.domain",
            posts: "user.posts",
            post: "domain.posts",
            upvotes: "posts.upvotes",
            room: "domain.rooms",
            roomOwner: "room.owner"
          }
        }
      });
    })
  }
};
