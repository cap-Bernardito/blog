import { baseApi, SESSION_TAG } from "shared/api";

import { checkSession } from "../lib/check-session";
import { mapSession } from "../lib/map-session";
import { Session } from "../model/types/session-schema";

import { RequestLoginBody, SessionDTO } from "./types";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: SessionDTO) => {
        const result = mapSession(response);

        checkSession(result);

        return result;
      },
    }),
  }),
});

export const { useLoginMutation } = sessionApi;
