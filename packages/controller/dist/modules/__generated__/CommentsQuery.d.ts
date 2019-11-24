export interface CommentsQuery_findComments_replies {
    __typename: "Comment";
    id: string;
    text: string;
    parentId: string | null;
    createdAt: string | null;
}
export interface CommentsQuery_findComments {
    __typename: "Comment";
    id: string;
    text: string;
    parentId: string | null;
    createdAt: string | null;
    replies: CommentsQuery_findComments_replies[] | null;
}
export interface CommentsQuery {
    findComments: CommentsQuery_findComments[] | null;
}
export interface CommentsQueryVariables {
    postId: string;
}
