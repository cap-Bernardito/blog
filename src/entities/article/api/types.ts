import { UserDTO } from "entities/user/@x";

import { ArticleBodyElement } from "../model/types/article";

export type ArticleDTO = {
  id: number;
  profile: UserDTO;
  title: string;
  excerpt: string;
  img: string;
  views: number;
  createdAt: string;
  type: string[];
  body: ArticleBodyElement[];
};

export type ArticlesRequestParams = {
  page: number;
  sortOrder: "asc" | "desc";
  sortType: "views" | "createdAt";
  search: string;
  limit?: number;
};
