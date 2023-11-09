import { request } from "shared/api";

import { mapCategories } from "../lib/map-categories";
import { ArticlesListStateSchema } from "../model/types/articles-list";

import { ArticlesCategoriesDTO } from "./types";

export const getArticlesCategories = async (): Promise<ArticlesListStateSchema["categories"]> => {
  const response = await request.get<ArticlesCategoriesDTO>(`/articles-categories`);

  return mapCategories(response);
};
