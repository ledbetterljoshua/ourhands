import { User } from "../entity/User";
import { Response, Request } from "express";
import { redis } from "../redis";
import { addUserSession } from "../utils/addUserSession";

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = await redis.get(id);
    if (!userId) {
      return res.send("invalid");
    }
    await User.update({ id: userId }, { confirmed: true });

    if (req.session) {
      await addUserSession(req.session, req.sessionID!, userId);
    }

    await redis.del(id);
    if (process.env.NODE_ENV === "test") {
      return res.send("ok");
    }
    return res.redirect(process!.env.FRONTEND_HOST as string);
  } catch (err) {
    return res.send(err);
  }
};
