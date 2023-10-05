import { isPlainObject } from "@reduxjs/toolkit";

export type User = {
  id: string;
  username: string;
};

export type UserSchema = {
  authData?: User;
};

export const isUser = (user: unknown): user is User => {
  if (!isPlainObject(user)) {
    return false;
  }

  return "id" in user && "username" in user;
};
