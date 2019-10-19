import gql from "graphql-tag";

export const registerMutation = gql`
  mutation RegisterMutation($email: String!) {
    register(email: $email) {
      path
      message
    }
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
      }
    }
  }
`;

// export const createPostMutation = gql`
//   mutation CreatePostMutation($title: String!, $details: String) {
//     createPost(input: { title: $title, details: $details }) {
//       path
//       message
//       post {
//         id
//       }
//     }
//   }
// `;
