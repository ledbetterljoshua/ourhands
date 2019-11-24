// import { Connection } from "typeorm";
// import { User } from "../../../entity/User";
// import { TestClient } from "../../../utils/TestClient";
// import { createTestConn } from "../../../test-utils/createTestConn";
// import {
//   userDoesNotExistError,
//   postDoesNotExistError,
//   userNotAuthorizedError,
//   successObject
// } from "./resolvers";

// let conn: Connection;
// const email = "deletePostTest@bob.com";
// const email2 = "deleteSecondPostTest@bob.com";
// const fakePostId = "0753b019-6006-414a-9c9b-2f7cf7f1b666";

// const client = new TestClient();

// beforeAll(async () => {
//   conn = await createTestConn();
//   await User.create({
//     email,
//     confirmed: true
//   }).save();
//   await User.create({
//     email: email2,
//     confirmed: true
//   }).save();
// });

// afterAll(async () => {
//   await conn.close();
// });

// describe("delete post", () => {
//   test("should fail with no logged in user", async () => {
//     const response = await client.deletePost(fakePostId);
//     expect(response.data.deletePost).toEqual([userDoesNotExistError]);
//   });

//   test("fail with fake post id", async () => {
//     await client.register(email);
//     const response = await client.deletePost(fakePostId);
//     expect(response.data.deletePost).toEqual([postDoesNotExistError]);
//   });
//   test("should fail because the user cannot delete other peoples posts", async () => {
//     const {
//       data: { createPost: createPostResponse }
//     } = await client.createPost("title", "details");
//     const [
//       {
//         post: { id: postId }
//       }
//     ] = createPostResponse;
//     await client.logout();
//     await client.register(email2);
//     const response = await client.deletePost(postId);
//     expect(response.data.deletePost).toEqual([userNotAuthorizedError]);
//   });
//   test("should delete post", async () => {
//     const {
//       data: { createPost: createPostResponse }
//     } = await client.createPost("title", "details");
//     const [
//       {
//         post: { id: postId }
//       }
//     ] = createPostResponse;
//     const response = await client.deletePost(postId);
//     expect(response.data.deletePost).toEqual([successObject]);
//   });
// });
