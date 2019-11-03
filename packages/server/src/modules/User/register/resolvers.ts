import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Domain } from "../../../entity/Domain";
import * as yup from "yup";
import { formatYupError } from "../../../utils/formatYupError";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { sendEmail } from "../../../utils/sendEmail";

import { emailValidation } from "../../../yupSchemas";
// import { userSessionIdPrefix } from "../../../constants";
// import { redis } from "../../../redis";
import { confirmEmailAddress } from "../shared/errorMessages";

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
      { url, session }
    ) => {
      try {
        await schema.validate({ email }, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const domain = email.split("@")[1];
      const userInDb = await User.findOne({ where: { email }, select: ["id"] });

      let domainInDb = await Domain.findOne({
        where: { name: domain },
        select: ["id"]
      });

      if (!domainInDb) {
        domainInDb = Domain.create({
          name: domain
        });
        await domainInDb.save();
      }

      if (userInDb) {
        // session.userId = userInDb.id;
        // const sessionIds = await redis.lrange(
        //   `${userSessionIdPrefix}${userInDb.id}`,
        //   0,
        //   -1
        // );
        // const hasSessions = sessionIds.length;
        // console.log("sessionIds", sessionIds);
        // if (hasSessions || isTesting) {
        //   //if the user is already authenticated, we can just log them in
        //   return null;
        // }
        await sendConfirmEmailLink(url, email, userInDb.id);
        return [{ path: "email", message: confirmEmailAddress }];
      }

      const user = User.create({
        email,
        domain: domainInDb
      });

      await user.save();

      session.userId = user.id;
      await sendConfirmEmailLink(url, email, user.id);

      return [{ path: "email", message: confirmEmailAddress }];
    }
  }
};
