import { Session } from "entities/session";

import { request } from "shared/api";

import { User } from "../model/types/user";

export const getUser = async (userId: Session["userId"]): Promise<User> => {
  const response = await request.get<User>(`/profile/${userId}`);

  return response;
};

export const updateUser = async (formData: User, userId: Session["userId"]): Promise<User> => {
  const response = await request.put<User, User>(`/profile/${userId}`, formData);

  return response;
};
