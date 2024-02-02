import { SessionUserId } from "../model/types/session-schema";

export type SessionDTO = {
  accessToken: string;
  user: {
    username: string;
    id: number;
    role: "ADMIN" | "USER" | "MANAGER";
  };
};

export type RequestLoginBody = {
  username: string;
  password: string;
};

export const toSessionUserId = (id: number): SessionUserId => {
  return id as SessionUserId;
};
