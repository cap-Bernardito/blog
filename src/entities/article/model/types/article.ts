export type TArticleBody = {
  id: string;
  tag?: keyof HTMLElementTagNameMap;
  type: "image" | string;
  body: TArticleBody[] | string;
  attrs?: Record<string, string>;
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
