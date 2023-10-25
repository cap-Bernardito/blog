import { rest } from "msw";
import { setupServer } from "msw/node";

import { configEnv } from "shared/config/config-env";

import { testSession, testUser } from "./fixtures/fixtures";

export const requestUrl = (endPoint: string) => `${configEnv.API_BASEURL}/${endPoint}`;

const handlers = [
  rest.get(requestUrl("profiles/1"), (req, res, ctx) => {
    const isAuthorized = req.headers.get("authorization");

    if (!isAuthorized) {
      return res(ctx.status(401), ctx.json({ message: "Not authorized" }));
    }

    return res(ctx.delay(100), ctx.status(200), ctx.json(testUser));
  }),

  rest.post(requestUrl("login"), async (req, res, ctx) => {
    const { username, password } = await req.json();

    return password === "valid" && username === "username"
      ? res(ctx.delay(100), ctx.status(200), ctx.json(testSession))
      : res(ctx.delay(100), ctx.status(401), ctx.json({ message: "Login or password is incorrect" }));
  }),

  rest.put(requestUrl("profiles/1"), async (req, res, ctx) => {
    const { first } = await req.json();

    if (first === "generate HTTPError") {
      return res(ctx.status(401), ctx.json({ message: "Не получается" }));
    }

    return res(ctx.delay(100), ctx.status(200), ctx.json(testUser));
  }),
];

export const server = setupServer(...handlers);
