import middleware from "./middleware";
import { createMiddleware } from "../../../utils/createMiddleware";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, async (_, __, { viewer }) => {
      if (!viewer || !viewer.confirmed) {
        return null;
      }
      const me = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .leftJoinAndSelect("user.posts", "post")
        .leftJoinAndSelect("post.upvotes", "upvote")
        .where("user.id = :id", { id: viewer!.id })
        .orderBy("post.createdAt", "DESC")
        .getOne();
      return me;
    })
  }
};
