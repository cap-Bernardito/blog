import { Article, ArticleDTO } from "entities/article/@x/article";

import { ARTICLES, baseApi } from "shared/api";

import { mapArticles } from "../lib/map-articles";
import { mapCategories } from "../lib/map-categories";
import { ArticlesListStateSchema } from "../model/types/articles-list";

import { ArticlesCategoriesDTO, ArticlesRTKRequestParams } from "./types";

export const articlesRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<Article[], ArticlesRTKRequestParams>({
      query: ({ requestParams }) => {
        const { page, limit, sortOrder, sortType, search, type } = requestParams;

        return {
          url: "/articles",
          params: {
            _page: page,
            _limit: limit,
            _expand: "profile",
            _sort: sortType,
            _order: sortOrder,
            q: search || "",
            type_like: type || "",
          },
        };
      },
      providesTags: [ARTICLES],
      transformResponse: (response: ArticleDTO[]) => mapArticles(response),
    }),
    getCategories: build.query<ArticlesListStateSchema["categories"], void>({
      query: () => ({
        url: "/articles-categories",
      }),
      transformResponse: (response: ArticlesCategoriesDTO) => mapCategories(response),
    }),
  }),
});
