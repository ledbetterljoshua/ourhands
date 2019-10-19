import { User } from "../../../entity/User";
import { Connection } from "typeorm";
import { createTestConn } from "../../../test-utils/createTestConn";
import { TestClient } from "../../../utils/testClient";

import { emailNotLongEnough, invalidEmail } from "../shared/errorMessages";

const email = "test2@gmail.com";

const client = new TestClient();

let conn: Connection;
beforeAll(async () => {
  conn = await createTestConn();
});
afterAll(async () => {
  await conn.close();
});

describe("A register mutation", () => {
  it("should register a valid user", async () => {
    const response = await client.register(email);
    expect(response.data).toEqual({ register: null });

    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    expect(users[0].email).toEqual(email);
    expect(users[0].confirmed).toBeFalsy();
  });

  it("if user exists, we should log them in", async () => {
    const response: any = await client.register(email);
    expect(response.data).toEqual({ register: null });
  });

  it("should not register a user with an invalid email", async () => {
    const response: any = await client.register("a");
    expect(response.data.register).toHaveLength(2);

    expect(response.data.register).toEqual([
      {
        message: emailNotLongEnough,
        path: "email"
      },
      {
        message: invalidEmail,
        path: "email"
      }
    ]);
  });
});
