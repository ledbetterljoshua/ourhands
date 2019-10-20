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

export const meQuery = gql`
  query MeQuery {
    me {
      id
      email
      posts {
        id
        title
        details
        upvoted
        upvoteCount
        createdAt
      }
    }
  }
`;

export const postsQuery = gql`
  query PostsQuery {
    findPosts {
      id
      title
      details
      createdAt
      upvoteCount
      upvoted
      user {
        email
        domain
      }
    }
  }
`;

export const createPostMutation = gql`
  mutation CreatePostMutation($title: String!, $details: String) {
    createPost(input: { title: $title, details: $details }) {
      path
      message
      post {
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
