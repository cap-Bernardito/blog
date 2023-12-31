import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { getArticlesRecommendations } from "../../api/article-api";
import { Article } from "../../model/types/article";

export const fetchArticlesRecommendations = createAsyncThunk<
  Article[],
  { limit?: number; type?: string; id: string },
  ThunkConfig<string>
>("article/fetchArticlesRecommendations", async ({ limit, type, id }, thunkApi) => {
  try {
    const response = await getArticlesRecommendations({ limit, type, id });

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
