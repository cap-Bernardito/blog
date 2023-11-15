import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Article } from "entities/article/@x/article";
import { getArticlesRecommendations } from "entities/article/api/article-api";

export const fetchArticlesRecommendations = createAsyncThunk<
  Article[],
  { limit?: number; type?: string },
  ThunkConfig<string>
>("article/fetchArticlesRecommendations", async ({ limit, type }, thunkApi) => {
  try {
    const response = await getArticlesRecommendations({ limit, type });

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
});
