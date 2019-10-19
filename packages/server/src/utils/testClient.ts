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
const createPostQuery = (title: string, details: string) => `
mutation {
  createPost(input: {title: "${title}", details: "${details}"}) {
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
    path
    message
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
    user {
      email
      domain
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

  async createPost(title: string, details: string) {
    return post(url, {
      ...this.options,
      body: {
        query: createPostQuery(title, details)
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
