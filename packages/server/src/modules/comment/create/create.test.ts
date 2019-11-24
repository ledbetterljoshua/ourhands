import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { Domain } from "../../../entity/Domain";
import { TestClient } from "../../../utils/testClient";
import { createTestConn } from "../../../test-utils/createTestConn";
import { Post } from "../../../entity/Post";

let conn: Connection;
const domain = "bob.com";
const email = `createPostTest@${domain}`;
const fakePostId = "0753b019-6006-414a-9c9b-2f7cf7f1b666";

const client = new TestClient();
// let post: Post;
beforeAll(async () => {
  conn = await createTestConn();
  const domainInDb = Domain.create({
    name: domain
  });
  await domainInDb.save();
  await User.create({
    email,
    confirmed: true,
    domain: domainInDb
  }).save();
  await client.register(email);
  // post = await client.createPost("title", "description", "");
});

afterAll(async () => {
  await conn.close();
});

describe("create post", () => {
  test("should fail bad post id", async () => {
    const response = await client.createComment("comment", fakePostId);
    console.log("response", response);
    expect(response.errors).toBeGreaterThan(0);
  });

  test("should create public post", async () => {
    const response = await client.createPost("title", "description", "PUBLIC");
    const {
      post: { id }
    } = response.data.createPost[0];
    const post = await Post.findOne({ where: { id }, relations: ["owner"] });

    expect(post!.owner).toBeTruthy();
    expect(post!.userIsPublic).toBeTruthy();
  });
  // test("should create private post", async () => {
  //   const response = await client.createPost("title", "description", "PRIVATE");

  //   const {
  //     post: { id }
  //   } = response.data.createPost[0];
  //   const post = await Post.findOne({ where: { id }, relations: ["owner"] });

  //   expect(post!.owner).toBeTruthy();
  //   expect(post!.userIsPublic).toBeFalsy();
  // });
  // test("should create anonymous post", async () => {
  //   const response = await client.createPost(
  //     "title",
  //     "description",
  //     "ANONYMOUS"
  //   );

  //   const {
  //     post: { id }
  //   } = response.data.createPost[0];
  //   const post = await Post.findOne({ where: { id }, relations: ["owner"] });
  //   expect(post!.userIsPublic).toBeFalsy();
  //   expect(post!.owner).toBeFalsy();
  // });
});
