import { EntityState } from "@reduxjs/toolkit";

import { Article } from "entities/article/@x/article";

export type ArticlesListStateSchema = EntityState<Article> & {
  isLoading: boolean;
  view: "grid" | "list";
  page: number;
  hasMore: boolean;
  _isInit: boolean;
  limit?: number;
  data?: Article[];
  error?: string;
};
