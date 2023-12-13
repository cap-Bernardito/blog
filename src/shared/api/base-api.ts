import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./base-query-with-reauth";
import { ARTICLE, ARTICLE_COMMENTS, ARTICLES, SESSION_TAG, USER_INFO } from "./tags";

export const baseApi = createApi({
  tagTypes: [SESSION_TAG, USER_INFO, ARTICLE, ARTICLE_COMMENTS, ARTICLES],
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
