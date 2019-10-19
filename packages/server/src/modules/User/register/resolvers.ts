import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import * as yup from "yup";
import { formatYupError } from "../../../utils/formatYupError";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { sendEmail } from "../../../utils/sendEmail";

import { emailValidation } from "../../../yupSchemas";
import { userSessionIdPrefix } from "../../../constants";
import { redis } from "../../../redis";

const isTesting = process.env.NODE_ENV === "test";

const schema = yup.object().shape({
  email: emailValidation
});

const sendConfirmEmailLink = async (url: string, email: string, id: string) => {
  const link = await createConfirmEmailLink(url, id);

  if (!isTesting) {
    console.log("should send email with link", link);
    await sendEmail(email, url, link);
  }
};

export const resolvers: ResolverMap = {
  Query: {
    bye: (_, __, { viewer }) => viewer
  },
  Mutation: {
    register: async (
      _,
      { email }: GQL.IRegisterOnMutationArguments,
      { url, sessionID, session }
    ) => {
      try {
        await schema.validate({ email }, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const domain = email.split("@")[1];
      const userInDb = await User.findOne({ where: { email }, select: ["id"] });

      if (userInDb) {
        session.userId = userInDb.id;
        const sessionIds = await redis.lrange(
          `${userSessionIdPrefix}${userInDb.id}`,
          0,
          -1
        );
        const hasSessions = sessionIds.length;
        if (hasSessions || isTesting) {
          //if the user is already authenticated, we can just add a new session for them
          await redis.lpush(`${userSessionIdPrefix}${userInDb.id}`, sessionID);
          return null;
        }
        await sendConfirmEmailLink(url, email, userInDb.id);
        return null;
      }

      const user = User.create({
        email,
        domain
      });

      await user.save();

      session.userId = user.id;
      await sendConfirmEmailLink(url, email, user.id);

      return null;
    }
  }
};
