import middleware from "./middleware";
import { createMiddleware } from "../../../utils/createMiddleware";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_, __, { viewer }) => {
      return viewer
        ? User.findOne({
            where: { id: viewer.id },
            relations: ["posts", "posts.upvotes"]
          })
        : null;
    })
  }
};
