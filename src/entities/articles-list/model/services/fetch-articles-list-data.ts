import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Article, getArticles } from "entities/article/@x/article";

import { addQueryParams } from "shared/lib/add-query-params";

import { selectLimit, selectPage, selectSearch, selectSortOrder, selectSortType, selectType } from "../selectors";

export const fetchArticlesList = createAsyncThunk<Article[], { replace?: boolean }, ThunkConfig<string>>(
  "article/fetchArticles",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ replace = false }, thunkApi) => {
    const page = selectPage(thunkApi.getState());
    const limit = selectLimit(thunkApi.getState());
    const sortOrder = selectSortOrder(thunkApi.getState());
    const sortType = selectSortType(thunkApi.getState());
    const search = selectSearch(thunkApi.getState());
    const type = selectType(thunkApi.getState());

    addQueryParams([
      ["_order", sortOrder],
      ["_sort", sortType],
      ["q", search],
      ["type", type],
    ]);

    try {
      const response = await getArticles({ page, limit, sortOrder, sortType, search, type });

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
