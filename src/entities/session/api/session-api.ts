import { request } from "shared/api";

import { mapSession } from "../lib/map-session";
import { Session } from "../model/types";

import { RequestLoginBody, SessionDto } from "./types";

export const login = async (data: RequestLoginBody): Promise<Session> => {
  const response = await request.post<SessionDto, RequestLoginBody>("login", data);

  return mapSession(response);
};
