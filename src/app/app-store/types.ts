import { Reducer } from "@reduxjs/toolkit";

import { AllUsersStateSchema } from "pages/users-page/model/types/all-users";

import type { ArticleStateSchema } from "entities/article";
import { ArticleCommentsStateSchema } from "entities/article-comments";
import { ArticlesListStateSchema } from "entities/articles-list";
import type { SessionStateSchema } from "entities/session";
import type { UserStateSchema } from "entities/user";

import { createReducerManager } from "./reducer-manager";

export type StateSchemaKey = keyof StateSchema;

export type AsyncStateSchemaKey = keyof AsyncStateSchema;

export type ReducerManager = ReturnType<typeof createReducerManager>;

export type StaticStateSchema = {
  session: SessionStateSchema;
};

export type StaticReducers<T> = {
  [K in keyof T]: Reducer<T[K]>;
};

export type AsyncStateSchema = {
  articles?: ArticlesListStateSchema;
  article?: ArticleStateSchema;
  articleComments?: ArticleCommentsStateSchema;
  user?: UserStateSchema;
  allUsers?: AllUsersStateSchema;
};

export type AsyncReducersList = {
  [name in AsyncStateSchemaKey]?: Reducer;
};

export type StateSchema = StaticStateSchema & AsyncStateSchema;

export type ThunkConfig<T> = {
  rejectValue: T;
  state: StateSchema;
};
