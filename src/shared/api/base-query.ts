import { type BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { configEnv } from "../config/config-env";
import { USER_LOCALSTORAGE_KEY } from "../const/localstorage";
import { SyncStorage } from "../lib/sync-storage";

const storage = new SyncStorage().create("local");

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> =
  fetchBaseQuery({
    baseUrl: configEnv.API_BASEURL,
    prepareHeaders: (headers) => {
      // TODO: приделать нормальную авторизацию
      const autorizationHeader = (storage.get(USER_LOCALSTORAGE_KEY) as string) && "atata";

      if (autorizationHeader) {
        headers.set("Authorization", autorizationHeader);
      }

      return headers;
    },
  });
