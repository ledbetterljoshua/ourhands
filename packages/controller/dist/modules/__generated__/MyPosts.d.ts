export interface MyPosts_me_posts {
    __typename: "Post";
    id: string;
    title: string;
    details: string | null;
    createdAt: string | null;
    upvoteCount: number;
    commentCount: number;
    upvoted: boolean;
}
export interface MyPosts_me {
    __typename: "User";
    id: string | null;
    posts: MyPosts_me_posts[] | null;
}
export interface MyPosts {
    me: MyPosts_me | null;
}
