import { ArticleDTO } from "../api/types";
import { TArticle } from "../model/types/article";

export function mapArticle(dto: ArticleDTO): TArticle {
  return {
    ...dto,
    id: String(dto.id),
  };
}
