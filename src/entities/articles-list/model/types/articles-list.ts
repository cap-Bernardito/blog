import { EntityState } from "@reduxjs/toolkit";

import { Article, ArticlesRequestParams } from "entities/article/@x/article";

export type ArticlesListStateSchema = EntityState<Article> &
  ArticlesRequestParams & {
    isLoading: boolean;
    view: "grid" | "list";
    hasMore: boolean;
    _isInit: boolean;
    data?: Article[];
    error?: string;
  };
