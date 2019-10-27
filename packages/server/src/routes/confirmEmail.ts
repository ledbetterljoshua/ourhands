import { User } from "../entity/User";
import { Response, Request } from "express";
import { redis } from "../redis";
import { userSessionIdPrefix } from "../constants";

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = await redis.get(id);
    if (!userId) {
      return res.send("invalid");
    }
    await User.update({ id: userId }, { confirmed: true });

    req!.session!.userId = userId;
    if (req.sessionID) {
      await redis.lpush(`${userSessionIdPrefix}${userId}`, req.sessionID);
    }

    await redis.del(id);
    return res.redirect(process!.env.FRONTEND_HOST as string);
  } catch (err) {
    return res.send(err);
  }
};
