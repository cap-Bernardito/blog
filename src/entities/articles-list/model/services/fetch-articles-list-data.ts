import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Article } from "entities/article/@x/article";

import { getApiErrorMessage } from "shared/api/get-api-error-message";
import { addQueryParams } from "shared/lib/add-query-params";

import { articlesRTKApi } from "../../api/articles-api";
import { selectLimit, selectPage, selectSearch, selectSortOrder, selectSortType, selectType } from "../selectors";

export const fetchArticlesList = createAsyncThunk<Article[], { replace?: boolean }, ThunkConfig<string>>(
  "articlesList/fetchArticles",
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
      const response = await thunkApi
        .dispatch(
          articlesRTKApi.endpoints.getArticles.initiate({
            requestParams: { page, limit, sortOrder, sortType, search, type },
            replace,
          }),
        )
        .unwrap();

      if (!response) {
        throw new Error("No data");
      }

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);
