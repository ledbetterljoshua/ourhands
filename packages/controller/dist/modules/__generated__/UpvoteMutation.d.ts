export interface UpvoteMutation_upvotePost {
    __typename: "Post";
    id: string;
    upvoteCount: number;
    upvoted: boolean;
}
export interface UpvoteMutation {
    upvotePost: UpvoteMutation_upvotePost | null;
}
export interface UpvoteMutationVariables {
    id: string;
}
