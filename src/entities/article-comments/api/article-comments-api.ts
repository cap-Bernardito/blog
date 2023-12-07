import { EntityState } from "@reduxjs/toolkit";

import { Article } from "entities/article/@x/article";

import { baseApi, request } from "shared/api";

import { mapArticleComments } from "../lib/map-article-comments";
import { articleCommentsAdapter, articleCommentsInitialState } from "../model/slice/article-comments-slice";
import { ArticleComment } from "../model/types/article-comments";

import { ArticleCommentDTO, RequestAddCommentData } from "./types";

export const articleCommentsRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allArticleComments: build.query<EntityState<ArticleComment>, Article["id"] | undefined>({
      query: (articleId) => ({
        url: "/comments",
        params: {
          articleId,
          _expand: "profile",
        },
      }),
      transformResponse: (response: ArticleCommentDTO[]) =>
        articleCommentsAdapter.setAll(articleCommentsInitialState, mapArticleComments(response)),
    }),
  }),
});

export const getArticleComments = async (articleId: Article["id"]): Promise<ArticleComment[]> => {
  const response = await request.get<ArticleCommentDTO[]>("/comments", {
    params: {
      articleId,
      _expand: "profile",
    },
  });

  return mapArticleComments(response);
};

export const addArticleComment = async (comment: RequestAddCommentData): Promise<ArticleComment> => {
  const response = await request.post<ArticleComment, RequestAddCommentData>("/comments", comment);

  return response;
};

export const { useAllArticleCommentsQuery } = articleCommentsRTKApi;
