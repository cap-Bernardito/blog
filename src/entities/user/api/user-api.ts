import { Session } from "entities/session/@x";

import { baseApi, SESSION_TAG } from "shared/api";
import { request } from "shared/api";

import { checkUser } from "../lib/check-user";
import { mapUser } from "../lib/map-user";
import { mapUsers } from "../lib/map-users";
import { User } from "../model/types/user-schema";

import { RequestUpdateUserBody, UserDTO } from "./types";

export const getUser = async (userId: number): Promise<User> => {
  const response = await request.get<UserDTO>(`/profiles/${userId}`);

  return mapUser(response);
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await request.get<UserDTO[]>(`/profiles`);

  return mapUsers(response);
};

export const updateUser = async (formData: RequestUpdateUserBody, userId: Session["userId"]): Promise<User> => {
  const response = await request.put<UserDTO, RequestUpdateUserBody>(`/profiles/${userId}`, formData);
  const result = mapUser(response);

  checkUser(result);

  return result;
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
  }),
});

export const { useMeQuery } = userRTKApi;
