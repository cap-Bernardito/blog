import { Language } from "shared/ui/code";

export type TArticleBodyImg = {
  id: string;
  tag: "img";
  type: string;
  attrs?: Record<string, string>;
};

export type TArticleBodyOther = {
  id: string;
  tag: keyof Omit<HTMLElementTagNameMap, "img">;
  type: string;
  body: TArticleBody[] | string;
  attrs?: Record<string, string> & { lang?: Language };
};

export type TArticleBody = TArticleBodyImg | TArticleBodyOther;

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
