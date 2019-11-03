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

export const startServer = async (): Promise<Server> => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  const port = getServerPort();
  const server = getGraphqlServer();
  const expressApp = express();

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
