import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Article, getArticles } from "entities/article/@x/article";

import { selectLimit } from "../selectors";

export const fetchArticlesList = createAsyncThunk<Article[], { page: number }, ThunkConfig<string>>(
  "article/fetchArticles",
  async ({ page }, thunkApi) => {
    const limit = selectLimit(thunkApi.getState());

    if (!limit) {
      return thunkApi.rejectWithValue("Не задан лимит статей");
    }

    try {
      const response = await getArticles({ page, limit });

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
