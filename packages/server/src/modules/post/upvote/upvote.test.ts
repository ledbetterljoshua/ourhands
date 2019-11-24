import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { TestClient } from "../../../utils/testClient";
import { createTestConn } from "../../../test-utils/createTestConn";
import { Upvote } from "../../../entity/Upvote";
import { Domain } from "../../../entity/Domain";

let conn: Connection;
const domain = "bob.com";
const email = "upvotePostTest@bob.com";
const fakePostId = "0753b019-6006-414a-9c9b-2f7cf7f1b666";

const client = new TestClient();
let userId: string;
beforeAll(async () => {
  conn = await createTestConn();
  const domainInDb = Domain.create({
    name: domain
  });
  await domainInDb.save();
  const user = await User.create({
    email,
    confirmed: true,
    domain: domainInDb
  }).save();
  userId = user.id as string;
});

afterAll(async () => {
  await conn.close();
});

const getUpvote = async (userId: string, postId: string) =>
  await Upvote.findOne({
    where: { userId, postId }
  });

describe("upvoting a post", () => {
  test("it fails when there is no user logged in", async () => {
    const response = await client.upvotePost("someId");
    expect(response.data.upvotePost).toBeNull();
  });

  test("it fails when the post does not exist", async () => {
    await client.register(email);
    const response = await client.upvotePost(fakePostId);
    expect(response.data.upvotePost).toBeNull();
  });

  test("the upvote is removed if this post has already been upvoted by this user", async () => {
    const {
      data: { createPost }
    } = await client.createPost("title", "description");
    const [
      {
        post: { id: postId }
      }
    ] = createPost;
    await client.upvotePost(postId);
    const upvote1 = await getUpvote(userId, postId);
    expect(upvote1).toBeFalsy();
    await client.upvotePost(postId);
    const upvote2 = await getUpvote(userId, postId);
    expect(upvote2).toBeTruthy();
    await client.upvotePost(postId);
    const upvote3 = await getUpvote(userId, postId);
    expect(upvote3).toBeFalsy();
  });
});
