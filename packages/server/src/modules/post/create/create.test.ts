import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { Domain } from "../../../entity/Domain";
import { TestClient } from "../../../utils/TestClient";
import { createTestConn } from "../../../test-utils/createTestConn";
import { Post } from "../../../entity/Post";

let conn: Connection;
const domain = "bob.com";
const email = `createPostTest@${domain}`;

const client = new TestClient();

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
});

afterAll(async () => {
  await conn.close();
});

describe("create post", () => {
  test("should fail with no logged in user", async () => {
    const response = await client.createPost("title", "description", "");
    expect(response.data.createPost).toBeNull();
  });

  test("should create public post", async () => {
    await client.register(email);
    const response = await client.createPost("title", "description", "PUBLIC");

    const {
      post: { id }
    } = response.data.createPost[0];
    const post = await Post.findOne({ where: { id }, relations: ["owner"] });

    expect(post!.owner).toBeTruthy();
    expect(post!.userIsPublic).toBeTruthy();
  });
  test("should create private post", async () => {
    const response = await client.createPost("title", "description", "PRIVATE");

    const {
      post: { id }
    } = response.data.createPost[0];
    const post = await Post.findOne({ where: { id }, relations: ["owner"] });

    expect(post!.owner).toBeTruthy();
    expect(post!.userIsPublic).toBeFalsy();
  });
  test("should create anonymous post", async () => {
    const response = await client.createPost(
      "title",
      "description",
      "ANONYMOUS"
    );

    const {
      post: { id }
    } = response.data.createPost[0];
    const post = await Post.findOne({ where: { id }, relations: ["owner"] });
    expect(post!.userIsPublic).toBeFalsy();
    expect(post!.owner).toBeFalsy();
  });
});
