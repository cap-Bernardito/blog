import type { LoginSchema } from "features/auth-by-username";

import { UserSchema } from "entities/user";

import { request } from "shared/api/api-request";

import { createReducerManager } from "./reducer-manager";

export type StateSchemaKey = keyof StateSchema;

export type ReducerManager = ReturnType<typeof createReducerManager>;

export type StateSchema = {
  user: UserSchema;

  // Асинхронные редюсеры
  loginForm?: LoginSchema;
};

export type ThunkConfig<T> = {
  rejectValue: T;
  extra: {
    api: typeof request;
  };
};
