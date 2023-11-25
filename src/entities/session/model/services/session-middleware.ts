import { Middleware } from "@reduxjs/toolkit";

import { AppDispatch } from "app/app-store";

import { sessionActions } from "../slice";

import { fetchSession } from "./fetch-session";

// NOTE: такое себе, но пока нет сервера для нормальной авторизации, как демо побудет так
export const sessionMiddleware: Middleware = ({ dispatch }: { dispatch: AppDispatch }) => {
  return (next) => async (action) => {
    if (sessionActions.setAuth.match(action)) {
      dispatch(fetchSession(action.payload.userId));
    }

    next(action);
  };
};
