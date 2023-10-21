import { ArticleBodyElement } from "../model/types/article";

export type ArticleDTO = {
  id: number;
  title: string;
  excerpt: string;
  img: string;
  views: number;
  createdAt: string;
  type: string[];
  body: ArticleBodyElement[];
};
