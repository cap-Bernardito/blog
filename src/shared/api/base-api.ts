import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./base-query";
import { SESSION_TAG } from "./tags";

export const baseApi = createApi({
  tagTypes: [SESSION_TAG],
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
