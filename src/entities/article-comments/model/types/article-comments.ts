import { EntityState } from "@reduxjs/toolkit";

export type ArticleComment = {
  id: number;
  text: string;
  articleId: number;
  author: {
    name: string;
    avatar: string;
  };
};

export type ArticleCommentsStateSchema = EntityState<ArticleComment> & {
  isLoading: boolean;
  data?: ArticleComment[];
  error?: string;
};
