import { type BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { configEnv } from "../config/config-env";
import { SyncStorage } from "../lib/sync-storage";

const tokensStorage = new SyncStorage().create("memory", "tokens");

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> =
  fetchBaseQuery({
    baseUrl: configEnv.API_BASEURL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const accessToken = tokensStorage.get("accessToken");

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  });
