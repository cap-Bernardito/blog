import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { getArticle } from "../../api/article-api";
import { type Article } from "../types/article";

export const fetchArticleData = createAsyncThunk<Article, Article["id"], ThunkConfig<string>>(
  "article/fetchArticleData",
  async (articleId, thunkApi) => {
    try {
      const response = await getArticle(articleId);

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
