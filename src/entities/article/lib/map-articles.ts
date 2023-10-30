import { ArticleDTO } from "../api/types";
import { Article } from "../model/types/article";

import { mapArticle } from "./map-article";

export function mapArticles(dto: ArticleDTO[]): Article[] {
  return dto.map((articleDto) => mapArticle(articleDto));
}
