import { ArticleCommentDTO } from "../api/types";
import { ArticleComment } from "../model/types/article-comments";

export function mapArticleComments(data: ArticleCommentDTO[]): ArticleComment[] {
  return data.map((dto) => {
    return {
      id: dto.id,
      text: dto.text,
      articleId: dto.articleId,
      author: {
        name: `${dto.profile.first} ${dto.profile.lastname}`,
        avatar: dto.profile.avatar,
      },
    };
  });
}
