import { request } from "shared/api";

import { checkSession } from "../lib/check-session";
import { mapSession } from "../lib/map-session";
import { Session } from "..";

import { RequestLoginBody, SessionDTO } from "./types";

export const login = async (data: RequestLoginBody): Promise<Session> => {
  const response = await request.post<SessionDTO, RequestLoginBody>("login", data);
  const result = mapSession(response);

  checkSession(result);

  return result;
};
