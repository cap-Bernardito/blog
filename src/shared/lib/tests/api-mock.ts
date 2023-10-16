import { rest } from "msw";
import { setupServer } from "msw/node";

import { configEnv } from "shared/config/config-env";

import { testSession, testUser } from "./fixtures/fixtures";

export const requestUrl = (endPoint: string) => `${configEnv.API_BASEURL}/${endPoint}`;

const handlers = [
  rest.get(requestUrl("profile/1"), (req, res, ctx) => {
    const isAuthorized = req.headers.get("authorization");

    if (!isAuthorized) {
      return res(ctx.status(401), ctx.json({ message: "Not authorized" }));
    }

    return res(ctx.delay(10), ctx.status(200), ctx.json(testUser));
  }),

  rest.post(requestUrl("login"), async (req, res, ctx) => {
    const { username, password } = await req.json();

    return password === "valid" && username === "username"
      ? res(ctx.delay(10), ctx.status(200), ctx.json(testSession))
      : res(ctx.delay(10), ctx.status(401), ctx.json({ reason: "Login or password is incorrect" }));
  }),
];

export const server = setupServer(...handlers);
