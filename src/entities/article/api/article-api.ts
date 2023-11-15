import { request } from "shared/api";

import { mapArticle } from "../lib/map-article";
import { mapArticles } from "../lib/map-articles";
import { Article } from "../model/types/article";

import { ArticleDTO, ArticlesRequestParams } from "./types";

export const getArticle = async (articleId: Article["id"]): Promise<Article> => {
  const response = await request.get<ArticleDTO>(`/articles/${articleId}`, {
    params: {
      _expand: "profile",
    },
  });

  return mapArticle(response);
};

export const getArticles = async (props: ArticlesRequestParams): Promise<Article[]> => {
  const { page, limit, sortOrder, sortType, search, type } = props;

  const response = await request.get<ArticleDTO[]>(`/articles`, {
    params: {
      _page: page,
      _limit: limit,
      _expand: "profile",
      _sort: sortType,
      _order: sortOrder,
      q: search,
      type_like: type,
    },
  });

  return mapArticles(response);
};

export const getArticlesRecommendations = async (
  props: Pick<ArticlesRequestParams, "limit" | "type">,
): Promise<Article[]> => {
  const { limit, type } = props;

  const response = await request.get<ArticleDTO[]>(`/articles`, {
    params: {
      _limit: limit || 8,
      _expand: "profile",
      type_like: type,
    },
  });

  return mapArticles(response);
};
