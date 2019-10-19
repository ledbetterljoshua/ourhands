import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { TestClient } from "../../../utils/TestClient";
import { createTestConn } from "../../../test-utils/createTestConn";

let conn: Connection;
const email = "bob3@bob.com";

const client = new TestClient();

beforeAll(async () => {
  conn = await createTestConn();
  await User.create({
    email,
    confirmed: true
  }).save();
});

afterAll(async () => {
  await conn.close();
});

describe("me", () => {
  test("return null if no cookie", async () => {
    const response = await client.me();
    expect(response.data.me).toBeNull();
  });

  test("get current user", async () => {
    await client.register(email);
    const response = await client.me();

    expect(response.data.me.email).toEqual(email);
  });
});
