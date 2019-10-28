import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { Upvote } from "../../../entity/Upvote";
import { getConnection } from "typeorm";
import { fieldSorter } from "../../../utils/fieldSorter";

function getLastWeek() {
  var today = new Date();
  var lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  return lastWeek;
}

var lastWeek = getLastWeek();
var lastWeekMonth = lastWeek.getMonth() + 1;
var lastWeekDay = lastWeek.getDate();
var lastWeekYear = lastWeek.getFullYear();

var lastWeekDisplay = lastWeekMonth + "/" + lastWeekDay + "/" + lastWeekYear;
var lastMonthDisplay = lastWeekMonth + "/" + "01" + "/" + lastWeekYear;

type RANGE = "THIS_WEEK" | "THIS_MONTH" | "EVERYTHING";

const ranges: any = {
  THIS_WEEK: lastWeekDisplay,
  THIS_MONTH: lastMonthDisplay,
  EVERYTHING: "10/01/2019"
};

export const resolvers: ResolverMap = {
  Post: {
    commentCount: async post => {
      return (post.comments && post.comments.length) || 0;
    },
    upvoteCount: async post => {
      return (post.upvotes && post.upvotes.length) || 0;
    },
    upvoted: async (post, _, { viewer }) => {
      const getUpvoted = (vote: Upvote) => {
        if (!vote || !viewer) return;
        return (vote.userId = viewer.id);
      };
      if (!post.upvotes) return false;
      const userUpvoted = post.upvotes.map(getUpvoted);
      return Boolean(userUpvoted.length);
    },
    user: async (post, __, { viewer, userLoader }) => {
      const isMine = viewer && post.user.id === viewer.id;
      return isMine ? userLoader.load(post!.user.id) : null;
    }
  },
  Query: {
    findPosts: async (_, { range }: { range: RANGE }, { viewer }) => {
      if (!viewer) return [];
      const rangeToUse = ranges[range || "THIS_WEEK"];
      const posts = await getConnection()
        .createQueryBuilder()
        .select("post")
        .from(Post, "post")
        .leftJoinAndSelect("post.user", "user")
        .leftJoinAndSelect("post.comments", "comment")
        .leftJoinAndSelect("post.upvotes", "upvote")
        .where("user.domain = :domain AND post.createdAt >= :range", {
          domain: viewer!.domain,
          range: rangeToUse
        })
        .skip(5)
        .take(10)
        .getMany();

      return posts.sort(fieldSorter(["-upvotecount", "-createdAt"]));
    }
  }
};
