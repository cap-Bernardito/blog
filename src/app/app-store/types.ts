import { Reducer } from "@reduxjs/toolkit";

import type { LoginSchema } from "features/auth/login";

import { ProfileSchema } from "entities/profile";
import { SessionSchema } from "entities/session";

import { createReducerManager } from "./reducer-manager";

export type StateSchemaKey = keyof StateSchema;

export type AsyncStateSchemaKey = keyof AsyncStateSchema;

export type ReducerManager = ReturnType<typeof createReducerManager>;

export type StaticStateSchema = {
  session: SessionSchema;
  profile: ProfileSchema;
};

export type StaticReducers<T> = {
  [K in keyof T]: Reducer<T[K]>;
};

export type AsyncStateSchema = {
  loginForm?: LoginSchema;
};

export type AsyncReducersList = {
  [name in AsyncStateSchemaKey]?: Reducer;
};

export type StateSchema = StaticStateSchema & AsyncStateSchema;

export type ThunkConfig<T> = {
  rejectValue: T;
};
