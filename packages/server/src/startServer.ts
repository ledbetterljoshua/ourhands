import "dotenv/config";
import "reflect-metadata";
import { Server } from "http";
import * as express from "express";
import * as bodyParser from "body-parser";
import { createTypeormConnection } from "./utils/createTypeormConnection";
import { confirmEmail } from "./routes/confirmEmail";
import { getGraphqlServer } from "./utils/getGraphqlServer";
import { getExpressSession } from "./middleware/getExpressSession";
import { getServerPort } from "./utils/getServerPort";
import { cors as corsOptions } from "./cors";
import { getExpressRateLimit } from "./middleware/getExpressRateLimit";
import { redis } from "./redis";

const { NODE_ENV } = process.env;

export const startServer = async (): Promise<Server> => {
  if (NODE_ENV === "test") {
    await redis.flushall();
  }

  const port = getServerPort();
  const server = getGraphqlServer();
  const expressApp = express();

  if (NODE_ENV === "production") {
    expressApp.set("trust proxy", 1);
  }

  expressApp.use(getExpressSession());
  expressApp.use(getExpressRateLimit());
  expressApp.use(bodyParser.json());

  expressApp.get("/confirm/:id", confirmEmail);

  server.applyMiddleware({ app: expressApp, cors: corsOptions });

  await createTypeormConnection();

  const app = await expressApp.listen({ port });
  console.log(`server is running on ${port}${server.graphqlPath}`);
  return app;
};
