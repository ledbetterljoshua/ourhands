import { pubsub } from "../create/resolvers";

export const resolver = {
  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator("commentAdded")
    }
  }
};
