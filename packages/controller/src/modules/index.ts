import gql from "graphql-tag";

export const registerMutation = gql`
  mutation RegisterMutation($email: String!) {
    register(email: $email) {
      path
      message
    }
  }
`;
export const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

export const myPosts = gql`
  query MyPosts {
    me {
      id
      posts {
        id
        title
        details
        createdAt
        upvoteCount
        commentCount
        upvoted
      }
    }
  }
`;
export const meQuery = gql`
  query MeQuery {
    me {
      id
      email
      domain {
        id
        name
        rooms {
          isOwner
          owner {
            email
          }
          title
          id
        }
      }
    }
  }
`;

export const postsQuery = gql`
  query PostsQuery($range: String) {
    findPosts(range: $range) {
      id
      title
      details
      createdAt
      upvoteCount
      commentCount
      upvoted
    }
  }
`;
export const commentsQuery = gql`
  query CommentsQuery($postId: ID!) {
    findComments(postId: $postId) {
      id
      text
      parentId
      createdAt
      replies {
        id
        text
        parentId
        createdAt
      }
    }
  }
`;

export const createPostMutation = gql`
  mutation CreatePostMutation(
    $title: String!
    $details: String
    $viewability: String
  ) {
    createPost(
      input: { title: $title, details: $details, viewability: $viewability }
    ) {
      path
      message
      post {
        id
      }
    }
  }
`;

export const createCommentMutation = gql`
  mutation CreateCommentMutation($text: String!, $parentId: ID, $postId: ID) {
    createComment(
      input: { text: $text, parentId: $parentId, postId: $postId }
    ) {
      path
      message
      comment {
        parentId
        text
        id
      }
    }
  }
`;

export const upvoteMutation = gql`
  mutation UpvoteMutation($id: ID!) {
    upvotePost(id: $id) {
      id
      upvoteCount
      upvoted
    }
  }
`;

export const deletePostMutation = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id) {
      path
      message
    }
  }
`;

export const deleteCommentMutation = gql`
  mutation DeleteCommentMutation($id: ID!, $isReply: Boolean) {
    deleteComment(id: $id, isReply: $isReply) {
      path
      message
    }
  }
`;
