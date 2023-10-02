import type { LoginSchema } from "features/auth-by-username";

import { userReducer, UserSchema } from "entities/user";

import { createReducerManager } from "./reducer-manager";

export type StateSchemaKey = keyof StateSchema;

export type ReducerManager = ReturnType<typeof createReducerManager>;

export type StateSchema = {
  user: UserSchema;

  // Асинхронные редюсеры
  loginForm?: LoginSchema;
};

export const staticReducers = {
  user: userReducer,
};
