import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchArticleData } from "../services/fetch-article-data";
import { fetchArticlesRecommendations } from "../services/fetch-articles-recommendations";
import { type ArticleStateSchema } from "../types/article";
import { Article } from "../types/article";

const initialState: ArticleStateSchema = {
  isLoading: false,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleData.fulfilled, (state, action: PayloadAction<Article>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchArticleData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Recommendations
      .addCase(fetchArticlesRecommendations.pending, (state) => {
        state.recommendations = undefined;
      })
      .addCase(fetchArticlesRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.recommendations = action.payload;
      });
  },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
