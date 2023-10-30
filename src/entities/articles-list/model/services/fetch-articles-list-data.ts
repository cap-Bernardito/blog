import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Article, getArticles } from "entities/article/@x/article";

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  "article/fetchArticles",
  async (_, thunkApi) => {
    try {
      const response = await getArticles();

      if (!response) {
        throw new Error("No data");
      }

      return response;
    } catch (error) {
      let errorMessage = "";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);
