import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Domain } from "../../../entity/Domain";
import { Room } from "../../../entity/Room";

export const notAuthenticatedError = {
  room: null,
  path: "authentication",
  message: "notAuthenticated"
};
export const successObject = {
  room: null,
  path: "create room",
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
    createRoom: async (_, { input: { ...data } }, { viewer }) => {
      if (!viewer || !isAuthenticated(viewer)) {
        throw Error("notAuthenticatedError");
      }

      let domainInDb = await Domain.findOne({
        where: { name: viewer.domain.name },
        select: ["id"]
      });

      if (!domainInDb) {
        throw Error("no domain found for user. You should not be this way...");
      }

      return Room.create({
        ...data,
        ownerId: viewer.id,
        domain: domainInDb
      }).save();
    }
  }
};
