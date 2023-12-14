import { ArticlesRequestParams, mapArticles } from "entities/articles-list/@x";

import { ARTICLE, baseApi } from "shared/api";

import { mapArticle } from "../lib/map-article";
import { Article } from "../model/types/article";

import { type ArticleDTO } from "./types";

export const articleRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArticle: build.query<Article, Article["id"] | undefined>({
      query: (articleId) => {
        return {
          url: `/articles/${articleId}`,
          params: {
            _expand: "profile",
          },
        };
      },
      providesTags: [ARTICLE],
      transformResponse: (response: ArticleDTO) => mapArticle(response),
    }),
    getArticlesRecommendations: build.query<Article[], Pick<ArticlesRequestParams, "limit" | "type"> & { id: string }>({
      query: ({ limit, type, id }) => {
        return {
          url: "/articles",
          params: {
            _limit: limit ?? 8,
            _expand: "profile",
            id_ne: id,
            type_like: type || "",
          },
        };
      },
      transformResponse: (response: ArticleDTO[]) => mapArticles(response),
    }),
  }),
});
