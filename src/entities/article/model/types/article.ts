import { User } from "entities/user/@x";

import { Language } from "shared/ui/code";

export type ArticleBodyElementImg = {
  id: string;
  tag: "img";
  type: string;
  attrs?: Record<string, string>;
};

export type ArticleBodyElementNoImg = {
  id: string;
  tag: keyof Omit<HTMLElementTagNameMap, "img">;
  type: string;
  body: ArticleBodyElement[] | string;
  attrs?: Record<string, string> & { lang?: Language };
};

export type ArticleBodyElement = ArticleBodyElementImg | ArticleBodyElementNoImg;

export type Article = {
  id: string;
  author: User;
  title: string;
  excerpt: string;
  img: string;
  views: number;
  createdAt: string;
  type: string[];
  body: ArticleBodyElement[];
};

export type ArticleStateSchema = {
  data?: Article;
  isLoading: boolean;
  error?: string;
};
