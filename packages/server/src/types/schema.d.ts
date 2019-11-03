// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation | ISubscription;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    findComments: Array<IComment> | null;
    findPosts: Array<IPost | null> | null;
    findRooms: Array<IRoom | null> | null;
    dummy: string | null;
    me: IUser | null;
    bye: IUser | null;
  }

  interface IFindCommentsOnQueryArguments {
    postId?: string | null;
  }

  interface IFindPostsOnQueryArguments {
    range?: string | null;
  }

  interface IComment {
    __typename: 'Comment';
    id: string;
    user: IUser;
    post: IPost;
    text: string;
    createdAt: string | null;
    parentId: string | null;
    replies: Array<IComment> | null;
    isOwner: boolean | null;
  }

  interface IUser {
    __typename: 'User';
    id: string | null;
    email: string | null;
    posts: Array<IPost> | null;
    domain: IDomain | null;
  }

  interface IPost {
    __typename: 'Post';
    id: string;
    title: string;
    details: string | null;
    owner: IUser | null;
    upvotes: Array<IUpvote> | null;
    comments: Array<IComment> | null;
    upvoteCount: number;
    commentCount: number;
    upvoted: boolean;
    createdAt: string | null;
    isOwner: boolean | null;
  }

  interface IUpvote {
    __typename: 'Upvote';
    id: string;
    postId: string | null;
    users: Array<IUser> | null;
  }

  interface IDomain {
    __typename: 'Domain';
    id: string;
    name: string;
    posts: Array<IPost> | null;
    rooms: Array<IRoom> | null;
  }

  interface IRoom {
    __typename: 'Room';
    id: string;
    owner: IUser;
    posts: Array<IPost> | null;
    domain: IDomain;
    description: string | null;
    title: string;
    isOwner: boolean;
  }

  interface IMutation {
    __typename: 'Mutation';
    createComment: Array<ICommentResponse> | null;
    deleteComment: Array<IPostResponse>;
    createPost: Array<IPostResponse> | null;
    deletePost: Array<IPostResponse>;
    upvotePost: IPost | null;
    createRoom: IRoom;
    logout: boolean | null;
    register: Array<IError> | null;
  }

  interface ICreateCommentOnMutationArguments {
    input: ICreateCommentInput;
  }

  interface IDeleteCommentOnMutationArguments {
    id: string;
    isReply?: boolean | null;
  }

  interface ICreatePostOnMutationArguments {
    input: ICreatePostInput;
  }

  interface IDeletePostOnMutationArguments {
    id: string;
  }

  interface IUpvotePostOnMutationArguments {
    id?: string | null;
  }

  interface ICreateRoomOnMutationArguments {
    input: ICreatePostInput;
  }

  interface IRegisterOnMutationArguments {
    email: string;
  }

  interface ICreateCommentInput {
    text: string;
    postId?: string | null;
    parentId?: string | null;
  }

  interface ICommentResponse {
    __typename: 'CommentResponse';
    path: string;
    message: string;
    comment: IComment | null;
  }

  interface IPostResponse {
    __typename: 'PostResponse';
    path: string;
    message: string;
    post: IPost | null;
  }

  interface ICreatePostInput {
    title: string;
    details?: string | null;
    viewability?: string | null;
    description?: string | null;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }

  interface ISubscription {
    __typename: 'Subscription';
    commentAdded: IComment | null;
  }

  interface ICommentAddedOnSubscriptionArguments {
    postId: string;
  }
}

// tslint:enable
