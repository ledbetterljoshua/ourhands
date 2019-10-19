import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { TestClient } from "../../../utils/TestClient";
import { createTestConn } from "../../../test-utils/createTestConn";

let conn: Connection;
const email1 = "findPostTest1@bob1.com";
const email2 = "findPostTest2@bob2.com";

const client = new TestClient();

beforeAll(async () => {
  conn = await createTestConn();
  await User.create({
    email: email1,
    domain: "bob1.com",
    confirmed: true
  }).save();
  await User.create({
    email: email2,
    domain: "bob2.com",
    confirmed: true
  }).save();
});

afterAll(async () => {
  await conn.close();
});

describe("create post", () => {
  test("should fail with no logged in user", async () => {
    const response = await client.findPosts();
    expect(response.data.findPosts).toHaveLength(0);
  });

  test("should create post with logged in user", async () => {
    await client.register(email1);
    const {
      data: { createPost: post1 }
    } = await client.createPost("title", "description");
    const postId = post1[0].post.id;
    const {
      data: { findPosts: posts1 }
    } = await client.findPosts();
    expect(posts1[0].id).toEqual(postId);
    await client.logout();
    await client.register(email2);
    const {
      data: { createPost: post2 }
    } = await client.createPost("title", "description");
    const {
      data: { findPosts: posts2 }
    } = await client.findPosts();
    expect(posts2).toHaveLength(1);
    expect(posts2[0].id).toEqual(post2[0].post.id);
  });
});
