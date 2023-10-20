import { Language } from "shared/ui/code";

export type TArticleBody = {
  id: string;
  tag: keyof HTMLElementTagNameMap;
  type: string;
  body: TArticleBody[] | string;
  attrs?: Record<string, string> & { lang?: Language };
};

export type TArticle = {
  id: string;
  title: string;
  excerpt: string;
  img: string;
  views: number;
  createdAt: string;
  type: string[];
  body: TArticleBody[];
};

export type ArticleStateSchema = {
  data?: TArticle;
  isLoading: boolean;
  error?: string;
};
