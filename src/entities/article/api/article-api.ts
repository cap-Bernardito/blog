import { request } from "shared/api";

import { mapArticle } from "../lib/map-article";
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
