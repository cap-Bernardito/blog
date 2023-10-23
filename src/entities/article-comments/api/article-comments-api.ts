import { Article } from "entities/article/@x/article";

import { request } from "shared/api";

import { mapArticleComments } from "../lib/map-article-comments";
import { ArticleComment } from "../model/types/article-comments";

import { ArticleCommentDTO } from "./types";

export const getArticleComments = async (articleId: Article["id"]): Promise<ArticleComment[]> => {
  const response = await request.get<ArticleCommentDTO[]>("/comments", {
    params: {
      articleId,
      _expand: "profile",
    },
  });

  return mapArticleComments(response);
};
