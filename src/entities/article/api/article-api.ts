import { request } from "shared/api";

import { mapArticle } from "../lib/map-article";
import { mapArticles } from "../lib/map-articles";
import { Article } from "../model/types/article";

import { ArticleDTO } from "./types";

export const getArticle = async (articleId: Article["id"]): Promise<Article> => {
  const response = await request.get<ArticleDTO>(`/articles/${articleId}`, {
    params: {
      _expand: "profile",
    },
  });

  return mapArticle(response);
};

export const getArticles = async (): Promise<Article[]> => {
  const response = await request.get<ArticleDTO[]>(`/articles`, {
    params: {
      _expand: "profile",
    },
  });

  return mapArticles(response);
};
