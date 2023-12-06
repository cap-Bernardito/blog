import { Reducer } from "@reduxjs/toolkit";

import type { ArticleStateSchema } from "entities/article";
import { ArticleCommentsStateSchema } from "entities/article-comments";
import { ArticlesListStateSchema } from "entities/articles-list";
import { ScrollPositionStateSchema } from "entities/scroll-position";
import type { SessionStateSchema } from "entities/session";

import { baseApi } from "shared/api";

import { createReducerManager } from "./reducer-manager";

export type StateSchemaKey = keyof StateSchema;

export type AsyncStateSchemaKey = keyof AsyncStateSchema;

export type ReducerManager = ReturnType<typeof createReducerManager>;

export type StaticStateSchema = {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
  session: SessionStateSchema;
  scrollPosition: ScrollPositionStateSchema;
};

export type StaticReducers<T> = {
  [K in keyof T]: Reducer<T[K]>;
};

export type AsyncStateSchema = {
  articles?: ArticlesListStateSchema;
  article?: ArticleStateSchema;
  articleComments?: ArticleCommentsStateSchema;
};

export type AsyncReducersList = {
  [name in AsyncStateSchemaKey]?: Reducer;
};

export type StateSchema = StaticStateSchema & AsyncStateSchema;

export type ThunkConfig<T> = {
  rejectValue: T;
  state: StateSchema;
};
