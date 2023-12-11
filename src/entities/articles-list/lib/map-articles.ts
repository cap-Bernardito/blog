import { Article, ArticleDTO, mapArticle } from "entities/article/@x/article";

export function mapArticles(dto: ArticleDTO[]): Article[] {
  return dto.map((articleDto) => mapArticle(articleDto));
}
