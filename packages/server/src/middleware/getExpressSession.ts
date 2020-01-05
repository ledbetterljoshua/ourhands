import * as session from "express-session";
import * as connectRedis from "connect-redis";
import { redis } from "../redis";
import { redisSessionPrefix } from "../constants";

const isProduction = process.env.NODE_ENV === "production";

const RedisStore = connectRedis(session);

export const getExpressSession = () =>
  session({
    store: new RedisStore({
      client: redis as any,
      prefix: redisSessionPrefix
    }),
    name: "qid",
    secret: process.env.USER_SESSION_SECRET! || "nothing",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // domain: process.env.FRONTEND_HOST,
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  });
