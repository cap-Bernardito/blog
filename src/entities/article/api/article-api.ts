import { request } from "shared/api";

import { mapArticle } from "../lib/map-article";
import { TArticle } from "../model/types/article";

import { ArticleDTO } from "./types";

export const getArticle = async (articleId: TArticle["id"]): Promise<TArticle> => {
  const response = await request.get<ArticleDTO>(`/articles/${articleId}`);

  return mapArticle(response);
};
