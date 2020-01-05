import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Domain } from "../../../entity/Domain";
import * as yup from "yup";
import { formatYupError } from "../../../utils/formatYupError";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
// import { sendEmail } from "../../../utils/sendEmail";

import { emailValidation } from "../../../yupSchemas";
// import { userSessionIdPrefix } from "../../../constants";
// import { redis } from "../../../redis";
import { confirmEmailAddress } from "../shared/errorMessages";
import { addUserSession } from "../../../utils/addUserSession";

const isTesting = process.env.NODE_ENV === "test";

const schema = yup.object().shape({
  email: emailValidation
});

const sendConfirmEmailLink = async (url: string, email: string, id: string) => {
  const link = await createConfirmEmailLink(url, id);
  console.log("link", link);
  console.log("email", email);
  // if (!isTesting) {
  //   await sendEmail(email, url, link);
  // }
};

export const resolvers: ResolverMap = {
  Query: {
    bye: (_, __, { viewer }) => viewer
  },
  Mutation: {
    register: async (
      _,
      { emails }: GQL.IRegisterOnMutationArguments,
      { url, session, sessionID }
    ) => {
      if (!Boolean(emails.length)) return "";
      const handleEmail = async (email: string) => {
        if (!email) return "";
        try {
          await schema.validate({ email }, { abortEarly: false });
        } catch (err) {
          return formatYupError(err);
        }

        const domain = email.split("@")[1];
        const userInDb = await User.findOne({
          where: { email },
          select: ["id", "domain"],
          relations: ["domain"]
        });

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
          if (isTesting) {
            return await addUserSession(session, sessionID!, userInDb.id);
          } else {
            return await sendConfirmEmailLink(url, email, userInDb.id);
          }
        }

        const user = User.create({
          email,
          confirmed: isTesting,
          domain: domainInDb
        });

        await user.save();

        session.userId = user.id;

        if (isTesting) {
          return await addUserSession(session, sessionID!, user.id);
        } else {
          await sendConfirmEmailLink(url, email, user.id);
        }
      };

      try {
        await Promise.all(emails.map(async email => await handleEmail(email!)));
        return [{ path: "email", message: confirmEmailAddress }];
      } catch (e) {
        return e;
      }
    }
  }
};
