import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { getArticlesCategories } from "entities/articles-list/api/articles-api";

import { ArticlesListStateSchema } from "../types/articles-list";

export const fetchArticlesCategories = createAsyncThunk<
  ArticlesListStateSchema["categories"],
  void,
  ThunkConfig<string>
>("article/fetchArticlesCategories", async (_, thunkApi) => {
  try {
    const response = await getArticlesCategories();

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
