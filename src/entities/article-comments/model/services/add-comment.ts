import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { RequestAddCommentData } from "entities/article-comments/api/types";

import { addArticleComment } from "../../api/article-comments-api";
import { ArticleComment } from "../types/article-comments";

import { fetchArticleComments } from "./fetch-article-comments-data";

export const addCommentThunk = createAsyncThunk<
  ArticleComment,
  { formData: RequestAddCommentData },
  ThunkConfig<string>
>("article/addComment", async ({ formData }, thunkApi) => {
  try {
    const response = await addArticleComment(formData);

    if (!response) {
      throw new Error("No data");
    }

    thunkApi.dispatch(fetchArticleComments(String(response.articleId)));

    return response;
  } catch (error) {
    let errorMessage = "";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return thunkApi.rejectWithValue(errorMessage);
  }
});
