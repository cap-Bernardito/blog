import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./base-query-with-reauth";
import { SESSION_TAG } from "./tags";

export const baseApi = createApi({
  tagTypes: [SESSION_TAG],
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
