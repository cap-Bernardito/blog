import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "app/app-store";

import { Article } from "entities/article/@x/article";

import {
  ARTICLES_SORT_FIELD_LOCALSTORAGE_KEY,
  ARTICLES_SORT_ORDER_LOCALSTORAGE_KEY,
  ARTICLES_VIEW_LOCALSTORAGE_KEY,
} from "shared/const/localstorage";
import { SyncStorage } from "shared/lib/sync-storage";

import { fetchArticlesList } from "../services/fetch-articles-list-data";
import { ArticlesListStateSchema } from "../types/articles-list";

const storage = new SyncStorage().create("local");

const getInitialView = (defaultView: ArticlesListStateSchema["view"]): ArticlesListStateSchema["view"] => {
  let result = storage.get(ARTICLES_VIEW_LOCALSTORAGE_KEY);

  if (!result) {
    result = defaultView;
    storage.add(ARTICLES_VIEW_LOCALSTORAGE_KEY, result);
  }

  return result as ArticlesListStateSchema["view"];
};

const articlesListAdapter = createEntityAdapter<Article>({
  selectId: (comment) => comment.id,
});

const initialState = articlesListAdapter.getInitialState<ArticlesListStateSchema>({
  isLoading: false,
  view: "grid",
  page: 1,
  hasMore: true,
  _isInit: false,
  sortOrder: "asc",
  sortType: "createdAt",
  ids: [],
  entities: {},
});

export const articlesListSlice = createSlice({
  name: "articlesListSlice",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticlesListStateSchema["view"]>) => {
      state.view = action.payload;
      state.limit = action.payload === "list" ? 3 : 12;
      storage.add(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<ArticlesListStateSchema["page"]>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = getInitialView("grid");

      state.view = view;
      state.limit = view === "list" ? 3 : 12;
    },
    setSortOrder: (state, action: PayloadAction<ArticlesListStateSchema["sortOrder"]>) => {
      state.page = 1;
      state.sortOrder = action.payload;
      storage.add(ARTICLES_SORT_ORDER_LOCALSTORAGE_KEY, action.payload);
    },
    setSortType: (state, action: PayloadAction<ArticlesListStateSchema["sortType"]>) => {
      state.page = 1;
      state.sortType = action.payload;
      storage.add(ARTICLES_SORT_FIELD_LOCALSTORAGE_KEY, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticlesList.fulfilled,
        (state, action: PayloadAction<Article[], string, { arg: { replace?: boolean } }>) => {
          state.isLoading = false;
          state._isInit = true;
          state.hasMore = action.payload.length === state.limit;

          if (action.meta.arg.replace) {
            articlesListAdapter.setAll(state, action.payload);
          } else {
            articlesListAdapter.addMany(state, action.payload);
          }
        },
      )
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const articlesAdapterSelectors = articlesListAdapter.getSelectors<RootState>(
  (state) => state.articles || articlesListAdapter.getInitialState(),
);

export const { actions: articlesActions } = articlesListSlice;
export const { reducer: articlesReducer } = articlesListSlice;
