import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import * as bcrypt from "bcryptjs";
import { userSessionIdPrefix } from "../../../constants";
import { redis } from "../../../redis";
import {
  invalidLogin,
  confirmEmailAddress,
  forgotPasswordLockedError
} from "../shared/errorMessages";

const invalidEmailError = {
  path: "email",
  message: invalidLogin
};
const confirmEmailError = {
  path: "email",
  message: confirmEmailAddress
};

/**
 * PASSWORDLESS AUTH
 * user initiates register with email
 * we store their email in redis along with a uuid for 15 mins, and send them an email with a link to /auth/<id>
 * we look up the id in redis, and if we find it we log them in
 */

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => "die"
  },
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session, sessionID }
    ) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return [invalidEmailError];
      }

      if (user.accountLocked) {
        return [
          {
            path: "email",
            message: `${forgotPasswordLockedError} - ${user.accountLockedReason}`
          }
        ];
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return [invalidEmailError];
      }

      if (!user.confirmed) {
        return [confirmEmailError];
      }

      session.userId = user.id;
      if (sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${user.id}`, sessionID);
      }

      return null;
    }
  }
};
