import { redis } from "../redis";
import { userSessionIdPrefix } from "../constants";
import { Session } from "../types/graphql-utils";

export const addUserSession = async (
  session: Session,
  sessionID: string,
  userId: string
) => {
  session!.userId = userId;
  if (sessionID) {
    await redis.lpush(`${userSessionIdPrefix}${userId}`, sessionID);
  }
};
