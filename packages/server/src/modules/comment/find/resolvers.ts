import { ResolverMap } from "../../../types/graphql-utils";
import { Comment } from "../../../entity/Comment";
import { CommentReply } from "../../../entity/CommentReply";
// import { getConnection } from "typeorm";
import { fieldSorter } from "../../../utils/fieldSorter";
import { checkIsOwner } from "../../../utils/checkIsOwner";

export const resolvers: ResolverMap = {
  Comment: {
    isOwner: checkIsOwner,
    replies: async ({ id }) => {
      const replies = await CommentReply.find({
        where: {
          parentId: id
        },
        join: {
          alias: "comment",
          leftJoinAndSelect: {
            replies: "comment.replies",
            owner: "comment.owner"
          }
        }
      });
      return replies.sort(fieldSorter(["createdAt"]));
    },
    user: async (comment, __, { viewer, userLoader }) => {
      const isMine = viewer && comment.user.id === viewer.id;
      return isMine ? userLoader.load(comment!.user.id) : null;
    }
  },
  Query: {
    findComments: async (_, { postId }, { viewer }) => {
      if (!viewer) return [];

      const comments = await Comment.find({
        where: {
          postId
        },
        join: {
          alias: "comment",
          leftJoinAndSelect: {
            post: "comment.post",
            owner: "comment.owner"
          }
        }
      });

      return comments.sort(fieldSorter(["createdAt"]));
    }
  }
};
