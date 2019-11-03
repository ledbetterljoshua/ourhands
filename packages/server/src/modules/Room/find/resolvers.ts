import { ResolverMap } from "../../../types/graphql-utils";
import { Room } from "../../../entity/Room";
import { checkIsOwner } from "../../../utils/checkIsOwner";

export const resolvers: ResolverMap = {
  Room: {
    isOwner: checkIsOwner
  },
  Query: {
    findRooms: async (_, __, { viewer }) => {
      if (!viewer) return [];

      const rooms = await Room.find({
        where: {
          domain: {
            id: viewer!.domain.id
          }
        },
        order: {
          createdAt: "DESC"
        },
        join: {
          alias: "room",
          leftJoinAndSelect: {
            domain: "room.domain",
            posts: "room.posts",
            owner: "room.owner"
          }
        }
      });
      console.log("rooms", rooms);
      return rooms;
    }
  }
};
