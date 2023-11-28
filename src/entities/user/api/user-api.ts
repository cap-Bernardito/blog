import { baseApi, SESSION_TAG } from "shared/api";
import { request } from "shared/api";

import { checkUser } from "../lib/check-user";
import { mapUser } from "../lib/map-user";
import { mapUsers } from "../lib/map-users";
import { User } from "../model/types/user-schema";

import { RequestUpdateUser, UserDTO } from "./types";

export const getUser = async (userId: number): Promise<User> => {
  const response = await request.get<UserDTO>(`/profiles/${userId}`);

  return mapUser(response);
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await request.get<UserDTO[]>(`/profiles`);

  return mapUsers(response);
};

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
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: UserDTO) => {
        const result = mapUser(response);

        checkUser(result);

        return result;
      },
    }),
  }),
});

export const { useMeQuery, useUpdateMeMutation } = userRTKApi;
