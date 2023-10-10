import { isPlainObject } from "@reduxjs/toolkit";

export type SessionUserId = Brand<Id, "SessionUserId">;

export type Session = {
  accessToken: string;
  userId: SessionUserId;
};

export type SessionSchemaAuth = {
  isAuthorized: true;
  accessToken: string;
  userId: SessionUserId;
  _isInit: true;
};

export type SessionSchemaNotAuth = {
  isAuthorized: false;
  accessToken?: string;
  userId?: SessionUserId;
  _isInit?: true;
};

export type SessionSchema = SessionSchemaAuth | SessionSchemaNotAuth;

// TODO: Move user to entities/user/model/types.ts
export type User = {
  id: string;
  username: string;
};

export const isSession = (session: unknown): session is Session => {
  if (!isPlainObject(session)) {
    return false;
  }

  return "userId" in session && "accessToken" in session;
};
