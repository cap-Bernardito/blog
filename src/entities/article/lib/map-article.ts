import { ArticleDTO } from "../api/types";
import { Article } from "../model/types/article";

export function mapArticle(dto: ArticleDTO): Article {
  return {
    ...dto,
    id: String(dto.id),
  };
}
