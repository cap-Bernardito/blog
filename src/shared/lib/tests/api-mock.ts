import { rest } from "msw";
import { setupServer } from "msw/node";
import nodeFetch, { Request, Response } from "node-fetch";

import { configEnv } from "../../config/config-env";

import { testSession, testUser } from "./fixtures/fixtures";

export const requestUrl = (endPoint: string) => `${configEnv.API_BASEURL}/${endPoint}`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = nodeFetch;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.Request = Request;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.Response = Response;

const handlers = [
  rest.get(requestUrl("profiles/1"), (req, res, ctx) => {
    const isAuthorized = req.headers.get("authorization");

    if (!isAuthorized) {
      return res(ctx.status(401), ctx.json({ message: "Not authorized" }));
    }

    return res(ctx.delay(100), ctx.status(200), ctx.json(testUser));
  }),

  rest.post(requestUrl("auth/login"), async (req, res, ctx) => {
    const { username, password } = await req.json();

    // TODO: после перехода на RTK Query возвращать просто текст ошибки без {message: error}
    return password === "valid" && username === "username"
      ? res(ctx.delay(100), ctx.status(200), ctx.json(testSession))
      : res(ctx.delay(100), ctx.status(401), ctx.json({ message: "Login or password is incorrect" }));
  }),

  rest.get(requestUrl("auth/me"), async (req, res, ctx) => {
    const hasAccessToken = window.document.cookie.includes("token");

    return hasAccessToken
      ? res(ctx.delay(100), ctx.status(200), ctx.json(testUser))
      : res(ctx.delay(100), ctx.status(401), ctx.json({ message: "AUTH ERROR" }));
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
