export const buildComment = (
  id: string,
  text: string,
  postId: string,
  me: any
) => ({
  id,
  text,
  postId,
  user: me,
  createdAt: Date.now(),
  parentId: "",
  replies: [],
  __typename: "Comment"
});
