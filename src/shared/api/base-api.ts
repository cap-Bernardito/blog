import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./base-query-with-reauth";
import { SESSION_TAG, USER_INFO } from "./tags";

export const baseApi = createApi({
  tagTypes: [SESSION_TAG, USER_INFO],
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
