import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Article } from "entities/article/@x/article";

import { getArticleComments } from "../../api/article-comments-api";
import { type ArticleComment } from "../types/article-comments";

export const fetchArticleComments = createAsyncThunk<ArticleComment[], Article["id"], ThunkConfig<string>>(
  "article/fetchArticleCommentsData",
  async (articleId, thunkApi) => {
    try {
      const response = await getArticleComments(articleId);

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
