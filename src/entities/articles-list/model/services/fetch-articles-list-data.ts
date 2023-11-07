import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Article, getArticles } from "entities/article/@x/article";

import { selectLimit, selectPage, selectSortOrder, selectSortType } from "../selectors";

export const fetchArticlesList = createAsyncThunk<Article[], { replace?: boolean }, ThunkConfig<string>>(
  "article/fetchArticles",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ replace = false }, thunkApi) => {
    const page = selectPage(thunkApi.getState());
    const limit = selectLimit(thunkApi.getState());
    const sortOrder = selectSortOrder(thunkApi.getState());
    const sortType = selectSortType(thunkApi.getState());

    if (!limit) {
      return thunkApi.rejectWithValue("Не задан лимит статей");
    }

    try {
      const response = await getArticles({ page, limit, sortOrder, sortType });

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
