import { User } from "../../../entity/User";
import { Connection } from "typeorm";
import { TestClient } from "../../../utils/TestClient";
import { createTestConn } from "../../../test-utils/createTestConn";

let conn: Connection;
const email = "bob2@bob.com";

let userId: string;
beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email,
    confirmed: true
  }).save();
  userId = user.id;
});

afterAll(async () => {
  await conn.close();
});

describe("logout", () => {
  test("multiple sessions", async () => {
    // computer 1
    const sess1 = new TestClient();
    // computer 2
    const sess2 = new TestClient();

    await sess1.register(email);
    await sess2.register(email);
    expect(await sess1.me()).toEqual(await sess2.me());
    await sess1.logout();
    const loggedOutSession = await sess1.me();
    expect(loggedOutSession.data.me).toBeNull();
    expect(loggedOutSession).toEqual(await sess2.me());
  });

  test("single session", async () => {
    const client = new TestClient();

    await client.register(email);

    const response = await client.me();

    expect(response.data).toEqual({
      me: {
        id: userId,
        email
      }
    });

    await client.logout();

    const response2 = await client.me();

    expect(response2.data.me).toBeNull();
  });
});
