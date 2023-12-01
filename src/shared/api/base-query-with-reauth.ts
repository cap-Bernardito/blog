import { type FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type BaseQueryApi, type QueryReturnValue } from "@reduxjs/toolkit/src/query/baseQueryTypes";

import { baseQuery } from "./base-query";
import { invalidateAccessToken } from "./invalidate-token-event";

const AUTH_ERROR_CODES = new Set([401]);

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  const result = await baseQuery(args, api, extraOptions);

  if (typeof result.error?.status === "number" && AUTH_ERROR_CODES.has(result.error.status)) {
    api.dispatch(invalidateAccessToken());
  }

  return result;
}
