import { EntityState } from "@reduxjs/toolkit";

import { Article } from "entities/article/@x/article";

import { ArticlesRequestParams } from "../../api/types";

export type ArticlesListStateSchema = EntityState<Article> &
  ArticlesRequestParams & {
    isLoading: boolean;
    view: "grid" | "list";
    hasMore: boolean;
    _isInit: boolean;
    categories?: string[];
    data?: Article[];
    error?: string;
  };
