import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "app/app-store";

import { fetchArticleComments } from "../services/fetch-article-comments-data";
import { ArticleComment, ArticleCommentsStateSchema } from "../types/article-comments";

const articleCommentsAdapter = createEntityAdapter<ArticleComment>({
  selectId: (comment) => comment.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = articleCommentsAdapter.getInitialState<ArticleCommentsStateSchema>({
  isLoading: false,
  ids: [],
  entities: {},
});

export const articleComments = createSlice({
  name: "articleComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleComments.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleComments.fulfilled, (state, action: PayloadAction<ArticleComment[]>) => {
        state.isLoading = false;
        articleCommentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const articleCommentsAdapterSelectors = articleCommentsAdapter.getSelectors<RootState>(
  (state) => state.articleComments || articleCommentsAdapter.getInitialState(),
);

export const { actions: articleCommentsActions } = articleComments;
export const { reducer: articleCommentsReducer } = articleComments;
