import { createEntityAdapter } from "@reduxjs/toolkit";

import { ArticleComment } from "../types/article-comments";

export const articleCommentsAdapter = createEntityAdapter<ArticleComment>({
  selectId: (comment) => comment.id,
});

export const articleCommentsInitialState = articleCommentsAdapter.getInitialState();

export const articleCommentsAdapterSelectors = articleCommentsAdapter.getSelectors();
