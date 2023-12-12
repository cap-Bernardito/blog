import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { getApiErrorMessage } from "shared/api/get-api-error-message";

import { articlesRTKApi } from "../../api/articles-api";
import { ArticlesListStateSchema } from "../types/articles-list";

export const fetchArticlesCategories = createAsyncThunk<
  ArticlesListStateSchema["categories"],
  void,
  ThunkConfig<string>
>("articlesList/fetchArticlesCategories", async (_, thunkApi) => {
  try {
    const response = await thunkApi.dispatch(articlesRTKApi.endpoints.getCategories.initiate()).unwrap();

    if (!response) {
      throw new Error("No data");
    }

    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(getApiErrorMessage(error));
  }
});
