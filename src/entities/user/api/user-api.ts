import { Session } from "entities/session";

import { request } from "shared/api";

import { checkUser } from "../lib/check-user";
import { mapUser } from "../lib/map-user";
import { User } from "../model/types/user-schema";

import { RequestUpdateUserBody, UserDTO } from "./types";

export const getUser = async (userId: Session["userId"]): Promise<User> => {
  const response = await request.get<UserDTO>(`/profile/${userId}`);

  return mapUser(response);
};

export const updateUser = async (formData: RequestUpdateUserBody, userId: Session["userId"]): Promise<User> => {
  const response = await request.put<UserDTO, RequestUpdateUserBody>(`/profile/${userId}`, formData);
  const result = mapUser(response);

  checkUser(result);

  return result;
};
