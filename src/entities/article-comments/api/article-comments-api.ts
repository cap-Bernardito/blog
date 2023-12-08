import { EntityState } from "@reduxjs/toolkit";

import { Article } from "entities/article/@x/article";

import { ARTICLE_COMMENTS, baseApi } from "shared/api";

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
      providesTags: [ARTICLE_COMMENTS],
      transformResponse: (response: ArticleCommentDTO[]) =>
        articleCommentsAdapter.setAll(articleCommentsInitialState, mapArticleComments(response)),
    }),
    addArticleComment: build.mutation<ArticleComment, RequestAddCommentData>({
      query: (formData) => ({
        url: `/comments`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [ARTICLE_COMMENTS],
    }),
  }),
});

export const { useAllArticleCommentsQuery } = articleCommentsRTKApi;
