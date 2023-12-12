import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { selectIsInit } from "../selectors";
import { articlesActions } from "../slice/articles-list-slice";

import { fetchArticlesCategories } from "./fetch-articles-categories";
import { fetchArticlesList } from "./fetch-articles-list-data";

export const fetchArticlesListInitial = createAsyncThunk<void, void, ThunkConfig<string>>(
  "articlesList/fetchArticlesInitial",
  async (_, thunkApi) => {
    const articlesIsInit = selectIsInit(thunkApi.getState());

    if (!articlesIsInit) {
      thunkApi.dispatch(articlesActions.initState());
      thunkApi.dispatch(fetchArticlesCategories());
      thunkApi.dispatch(fetchArticlesList({ replace: true }));
    }
  },
);
