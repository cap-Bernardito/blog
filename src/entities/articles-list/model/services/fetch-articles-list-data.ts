import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { articlesRTKApi } from "entities/article/@x/article";

import { addQueryParams } from "shared/lib/add-query-params";

import { selectLimit, selectPage, selectSearch, selectSortOrder, selectSortType, selectType } from "../selectors";

export const fetchArticlesList = createAsyncThunk<void, { replace?: boolean }, ThunkConfig<string>>(
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

    thunkApi.dispatch(
      articlesRTKApi.endpoints.getArticles.initiate({
        requestParams: { page, limit, sortOrder, sortType, search, type },
        replace,
      }),
    );
  },
);
