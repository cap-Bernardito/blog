export type ArticlesCategoriesDTO = { string: number };

export type ArticlesRequestParams = {
  page: number;
  sortOrder: "asc" | "desc";
  sortType: "views" | "createdAt";
  search: string;
  limit?: number;
  type?: string;
};

export type ArticlesRTKRequestParams = {
  requestParams: ArticlesRequestParams;
  replace?: boolean;
};
