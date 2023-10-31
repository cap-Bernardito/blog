import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "app/app-store";

import { Article } from "entities/article/@x/article";

import { fetchArticlesList } from "../services/fetch-articles-list-data";
import { ArticlesListStateSchema } from "../types/articles-list";

const articlesListAdapter = createEntityAdapter<Article>({
  selectId: (comment) => comment.id,
  sortComparer: (a, b) => Number(a.id) - Number(b.id),
});

const initialState = articlesListAdapter.getInitialState<ArticlesListStateSchema>({
  isLoading: false,
  view: "grid",
  ids: [],
  entities: {},
});

export const articlesListSlice = createSlice({
  name: "articlesListSlice",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticlesListStateSchema["view"]>) => {
      state.view = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        articlesListAdapter.setAll(state, action.payload);
      })
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
