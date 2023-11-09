import { ArticlesCategoriesDTO } from "../api/types";
import { ArticlesListStateSchema } from "../model/types/articles-list";

export const mapCategories = (data: ArticlesCategoriesDTO): ArticlesListStateSchema["categories"] => {
  return Object.keys(data);
};
