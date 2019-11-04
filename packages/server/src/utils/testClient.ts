import { post, jar } from "request-promise";

const url = process.env.TEST_HOST as string;

const registerQuery = (email: string) => `
mutation {
  register(email: "${email}") {
    path
    message
  }
}
`;
const createCommentQuery = (
  text: string,
  postId: string,
  parentId?: string
) => `
mutation {
  createComment(
    input: { text: "${text}", parentId: "${parentId}", postId: "${postId}" }
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
const editPostQuery = (
  title?: string,
  details?: string,
  viewability?: string
) => `
mutation {
  createPost(input: {title: "${title}", details: "${details}", viewability: "${viewability}"}) {
    post { 
      id
      title
      description
      owner {
        id
      }
    }
  }
}
`;
const createPostQuery = (
  title: string,
  details: string,
  viewability?: string
) => `
mutation {
  createPost(input: {title: "${title}", details: "${details}", viewability: "${viewability}"}) {
    path
    message
    post { 
      id
    }
  }
}
`;
const upvotePostQuery = (id: string) => `
mutation {
  upvotePost(id: "${id}") {
    id
  }
}
`;
const deletePostQuery = (id: string) => `
mutation {
  deletePost(id: "${id}") {
    path
    message
  }
}
`;
const findPostsQuery = () => `
{
  findPosts {
    id
    title
    upvoteCount
    upvoted
    owner {
      email
      domain {
        id
        name
      }
    }
  }
}
`;

export class TestClient {
  options: {
    withCredentials: boolean;
    jar: any;
    json: boolean;
  };
  constructor() {
    this.options = {
      withCredentials: true,
      jar: jar(),
      json: true
    };
  }

  async createPost(title: string, details: string, viewability?: string) {
    return post(url, {
      ...this.options,
      body: {
        query: createPostQuery(title, details, viewability)
      }
    });
  }
  async editPost(title?: string, details?: string, viewability?: string) {
    return post(url, {
      ...this.options,
      body: {
        query: editPostQuery(title, details, viewability)
      }
    });
  }
  async createComment(text: string, postId: string, parentId?: string) {
    return post(url, {
      ...this.options,
      body: {
        query: createCommentQuery(text, postId, parentId)
      }
    });
  }

  async upvotePost(id: string) {
    return post(url, {
      ...this.options,
      body: {
        query: upvotePostQuery(id)
      }
    });
  }
  async deletePost(id: string) {
    return post(url, {
      ...this.options,
      body: {
        query: deletePostQuery(id)
      }
    });
  }

  async findPosts() {
    return post(url, {
      ...this.options,
      body: {
        query: findPostsQuery()
      }
    });
  }

  async register(email: string) {
    return post(url, {
      ...this.options,
      body: {
        query: registerQuery(email)
      }
    });
  }
  async logout() {
    return post(url, {
      ...this.options,
      body: {
        query: `
          mutation {
            logout
          }
        `
      }
    });
  }
  async me() {
    return post(url, {
      ...this.options,
      body: {
        query: `
          {
            me {
              id
              email
            }
          }
        `
      }
    });
  }
}
