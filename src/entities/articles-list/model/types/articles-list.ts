import { EntityState } from "@reduxjs/toolkit";

import { Article } from "entities/article/@x/article";

export type ArticlesListStateSchema = EntityState<Article> & {
  isLoading: boolean;
  view: "grid" | "list";
  data?: Article[];
  error?: string;
};
