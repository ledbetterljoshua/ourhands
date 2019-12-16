import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { Upvote } from "../../../entity/Upvote";
import { checkIsOwner } from "../../../utils/checkIsOwner";
// import { Coun } from "typeorm";
// import { Between } from "typeorm";
// import { fieldSorter } from "../../../utils/fieldSorter";

const getDate = (range: number) => () => {
  var today = new Date();
  const date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - range
  );
  return {
    month: date.getMonth(),
    day: date.getDate(),
    year: date.getFullYear(),
    date
  };
};

const getToday = getDate(0);
const getLastWeek = getDate(7);

const lastWeek = getLastWeek();
const lastWeekMonth = lastWeek.month + 1,
  lastWeekDay = lastWeek.day,
  lastWeekYear = lastWeek.year;
const now = getToday();
const today = now.day,
  thisMonth = now.month,
  thisYear = now.year;

const nowDisplay = thisMonth + "/" + today + "/" + thisYear;
const lastWeekDisplay = lastWeekMonth + "/" + lastWeekDay + "/" + lastWeekYear;
const lastMonthDisplay = lastWeekMonth + "/" + "01" + "/" + lastWeekYear;
console.log(nowDisplay);
type RANGE = "THIS_WEEK" | "THIS_MONTH" | "EVERYTHING";

const ranges: any = {
  THIS_WEEK: lastWeekDisplay,
  THIS_MONTH: lastMonthDisplay,
  EVERYTHING: "10/01/2019"
};

export const getCommentCount = async (post: any) => {
  return (post.comments && post.comments.length) || 0;
};
export const getUpvoteCount = async (post: any) => {
  return (post.upvotes && post.upvotes.length) || 0;
};

export const getUpvotedBool = async (post: any, _: any, { viewer }: any) => {
  const getUpvoted = (vote: Upvote) => {
    if (!vote || !viewer) return;
    return vote.userId === viewer.id;
  };
  if (!post.upvotes || !post.upvotes.length) return false;
  const userUpvoted = post.upvotes.map(getUpvoted).filter(Boolean);
  return Boolean(userUpvoted.length);
};

export const getOwner = async (post: any, __: any, context: any) => {
  if (!post.owner && !post.ownerId) return false;
  const isOwner = checkIsOwner(post, __, context);
  if (post.userIsPublic || isOwner) {
    if (post.ownerId === context.viewer.id) {
      return context.viewer;
    }
    return post.owner;
  }
};

export const resolvers: ResolverMap = {
  Post: {
    isOwner: checkIsOwner,
    commentCount: getCommentCount,
    upvoteCount: getUpvoteCount,
    upvoted: getUpvotedBool,
    owner: getOwner
  },
  Query: {
    findPosts: async (_, { range }: { range: RANGE }, { viewer }) => {
      if (!viewer) return [];
      const rangeToUse = ranges[range || "THIS_WEEK"];
      console.log("rangeToUse", rangeToUse);
      let posts;
      try {
        posts = await Post.find({
          where: {
            // createdAt: Raw(alias => `${alias} < ${lastWeek.date}`),
            domain: {
              id: viewer!.domain.id
            }
          },
          order: {
            // upvotes: "DESC",
            createdAt: "DESC"
          },
          join: {
            alias: "post",
            leftJoinAndSelect: {
              comments: "post.comments",
              upvotes: "post.upvotes",
              domain: "post.domain",
              owner: "post.owner"
            }
          }
        });
      } catch (e) {
        console.log("caught error", e);
      }
      return posts;
    }
  }
};
