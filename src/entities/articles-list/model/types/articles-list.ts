import { EntityState } from "@reduxjs/toolkit";

import { Article } from "entities/article/@x/article";

export type ArticlesListStateSchema = EntityState<Article> & {
  isLoading: boolean;
  data?: Article[];
  error?: string;
};
