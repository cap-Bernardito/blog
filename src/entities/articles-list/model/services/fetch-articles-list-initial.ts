import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { selectIsInit } from "../selectors";
import { articlesActions } from "../slice/articles-list-slice";

import { fetchArticlesList } from "./fetch-articles-list-data";

export const fetchArticlesListInitial = createAsyncThunk<void, void, ThunkConfig<string>>(
  "article/fetchArticlesInitial",
  async (_, thunkApi) => {
    const articlesIsInit = selectIsInit(thunkApi.getState());

    if (!articlesIsInit) {
      thunkApi.dispatch(articlesActions.initState());
      thunkApi.dispatch(fetchArticlesList({ page: 1 }));
    }
  },
);
