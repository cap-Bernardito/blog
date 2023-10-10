import { SessionUserId } from "../model/types";

export type SessionDto = {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
};

export type RequestLoginBody = {
  username: string;
  password: string;
};

export const toSessionUserId = (id: number): SessionUserId => {
  return id as SessionUserId;
};
