import { CommentsQuery_findComments } from "@ourhands/controller/dist/modules/__generated__/CommentsQuery";

interface comment {
  id: string;
  text: string;
  parentId?: string;
  me: any;
}

export const buildComment = ({
  id,
  text,
  parentId = ""
}: comment): CommentsQuery_findComments => ({
  id,
  text,
  createdAt: String(Date.now()),
  parentId: parentId,
  replies: [],
  __typename: "Comment"
});
