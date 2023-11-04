import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { selectHasMore, selectIsLoading, selectPage } from "../selectors";
import { articlesActions } from "../slice/articles-list-slice";

import { fetchArticlesList } from "./fetch-articles-list-data";

export const fetchArticlesListPortion = createAsyncThunk<void, void, ThunkConfig<string>>(
  "article/fetchArticlesPortion",
  async (_, thunkApi) => {
    const page = selectPage(thunkApi.getState());
    const hasMore = selectHasMore(thunkApi.getState());
    const isLoading = selectIsLoading(thunkApi.getState());

    if (page && hasMore && !isLoading) {
      thunkApi.dispatch(articlesActions.setPage(page + 1));
      thunkApi.dispatch(fetchArticlesList({ page: page + 1 }));
    }
  },
);
