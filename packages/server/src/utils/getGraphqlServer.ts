import { ApolloServer } from "apollo-server-express";
import { getSchemas } from "./getGraphqlSchemas";
import { getViewerFromSession } from "./getViewerFromSession";
import { userLoader } from "../loaders/userLoader";

const schemas = getSchemas();
export const getGraphqlServer = () =>
  new ApolloServer({
    schema: schemas,
    context: async ({ req, connection }) => {
      if (connection) {
        return connection.context;
      }
      const viewer = await getViewerFromSession(req!.session!);
      return {
        url: `${req.protocol}://${req.get("host")}`,
        session: req.session,
        sessionID: req.sessionID,
        userLoader: userLoader(),
        viewer
      };
    }
  });
