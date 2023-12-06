import { baseApi, SESSION_TAG, USER_INFO } from "shared/api";

import { checkUser } from "../lib/check-user";
import { mapUser } from "../lib/map-user";
import { mapUsers } from "../lib/map-users";
import { User } from "../model/types/user-schema";

import { RequestUpdateUser, UserDTO } from "./types";

export const userRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<User, void>({
      query: () => ({
        url: `/auth/me`,
      }),
      providesTags: [SESSION_TAG],
      transformResponse: (response: UserDTO) => {
        const result = mapUser(response);

        checkUser(result);

        return result;
      },
    }),
    updateMe: build.mutation<User, RequestUpdateUser>({
      query: ({ formData, userId }) => ({
        url: `/profiles/${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [SESSION_TAG, USER_INFO],
      transformResponse: (response: UserDTO) => {
        const result = mapUser(response);

        checkUser(result);

        return result;
      },
    }),
    allUsers: build.query<User[], void>({
      query: () => ({
        url: `/profiles`,
      }),
      transformResponse: (response: UserDTO[]) => mapUsers(response),
    }),
    getUser: build.query<User, string | undefined>({
      query: (userId) => ({
        url: `/profiles/${userId}`,
      }),
      providesTags: [USER_INFO],
      transformResponse: (response: UserDTO) => mapUser(response),
    }),
  }),
});

export const { useMeQuery, useUpdateMeMutation, useGetUserQuery, useAllUsersQuery } = userRTKApi;
