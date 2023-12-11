import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { articlesRTKApi } from "../../api/articles-api";

export const fetchArticlesCategories = createAsyncThunk<void, void, ThunkConfig<string>>(
  "article/fetchArticlesCategories",
  (_, thunkApi) => {
    thunkApi.dispatch(articlesRTKApi.endpoints.getCategories.initiate());
  },
);
