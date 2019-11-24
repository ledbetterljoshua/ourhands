import { Connection } from "typeorm";
import { User } from "../../../entity/User";
// import { TestClient } from "../../../utils/testClient";
import { createTestConn } from "../../../test-utils/createTestConn";
import { Domain } from "../../../entity/Domain";

let conn: Connection;
const domain = "bob.com";
const email = "deletePostTest@bob.com";
const email2 = "deleteSecondPostTest@bob.com";
// const fakePostId = "0753b019-6006-414a-9c9b-2f7cf7f1b666";

// const client = new TestClient();

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
  await User.create({
    email: email2,
    confirmed: true,
    domain: domainInDb
  }).save();
});

afterAll(async () => {
  await conn.close();
});

describe("delete post", () => {
  // can't edit if the post doesn't exsit
  // can't edit if the post isn't yours
  // can edit
});
