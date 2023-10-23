import { Reducer } from "@reduxjs/toolkit";

import type { ArticleStateSchema } from "entities/article";
import { ArticleCommentsStateSchema } from "entities/article-comments";
import type { SessionStateSchema } from "entities/session";
import type { UserStateSchema } from "entities/user";

import { createReducerManager } from "./reducer-manager";

export type StateSchemaKey = keyof StateSchema;

export type AsyncStateSchemaKey = keyof AsyncStateSchema;

export type ReducerManager = ReturnType<typeof createReducerManager>;

export type StaticStateSchema = {
  session: SessionStateSchema;
  user: UserStateSchema;
};

export type StaticReducers<T> = {
  [K in keyof T]: Reducer<T[K]>;
};

export type AsyncStateSchema = {
  article?: ArticleStateSchema;
  articleComments?: ArticleCommentsStateSchema;
};

export type AsyncReducersList = {
  [name in AsyncStateSchemaKey]?: Reducer;
};

export type StateSchema = StaticStateSchema & AsyncStateSchema;

export type ThunkConfig<T> = {
  rejectValue: T;
};
