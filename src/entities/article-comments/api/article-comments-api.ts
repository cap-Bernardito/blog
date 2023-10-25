import { Article } from "entities/article/@x/article";

import { request } from "shared/api";

import { mapArticleComments } from "../lib/map-article-comments";
import { ArticleComment } from "../model/types/article-comments";

import { ArticleCommentDTO, RequestAddCommentData } from "./types";

export const getArticleComments = async (articleId: Article["id"]): Promise<ArticleComment[]> => {
  const response = await request.get<ArticleCommentDTO[]>("/comments", {
    params: {
      articleId,
      _expand: "profile",
    },
  });

  return mapArticleComments(response);
};

export const addArticleComment = async (comment: RequestAddCommentData): Promise<ArticleComment> => {
  const response = await request.post<ArticleComment, RequestAddCommentData>("/comments", comment);

  return response;
};
