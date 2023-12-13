import { ArticlesRequestParams, mapArticles } from "entities/articles-list/@x";

import { ARTICLE, baseApi, request } from "shared/api";

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
  }),
});

export const getArticlesRecommendations = async (
  props: Pick<ArticlesRequestParams, "limit" | "type"> & { id: string },
): Promise<Article[]> => {
  const { limit, type, id } = props;

  const response = await request.get<ArticleDTO[]>(`/articles`, {
    params: {
      _limit: limit || 8,
      _expand: "profile",
      id_ne: id,
      type_like: type,
    },
  });

  return mapArticles(response);
};
