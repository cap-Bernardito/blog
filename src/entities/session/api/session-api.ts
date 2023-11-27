import { baseApi, SESSION_TAG } from "shared/api";
import { SyncStorage } from "shared/lib/sync-storage";

import { checkSession } from "../lib/check-session";
import { mapSession } from "../lib/map-session";
import { Session } from "../model/types/session-schema";

import { RequestLoginBody, SessionDTO } from "./types";

const tokensStorage = new SyncStorage().create("memory", "tokens");

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: SessionDTO) => {
        const { user, accessToken } = response;

        const result = mapSession(user);

        checkSession(result);

        tokensStorage.add("accessToken", accessToken);

        return result;
      },
    }),
    auth: build.query<Session, void>({
      query: () => ({
        url: `/auth/token`,
      }),
      transformResponse: (response: SessionDTO) => {
        const { user, accessToken } = response;

        const result = mapSession(user);

        checkSession(result);

        tokensStorage.add("accessToken", accessToken);

        return result;
      },
    }),
    logout: build.query<Session, void>({
      query: () => ({
        url: `/auth/logout`,
      }),
    }),
  }),
});

export const { useLoginMutation, useAuthQuery, useLogoutQuery } = sessionApi;
