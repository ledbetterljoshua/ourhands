export interface DeletePostMutation_deletePost {
    __typename: "PostResponse";
    path: string;
    message: string;
}
export interface DeletePostMutation {
    deletePost: DeletePostMutation_deletePost[];
}
export interface DeletePostMutationVariables {
    id: string;
}
