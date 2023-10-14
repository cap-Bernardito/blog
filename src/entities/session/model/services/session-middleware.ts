import { Middleware } from "@reduxjs/toolkit";

import { AppDispatch } from "app/app-store/store";

import { fetchUserData } from "entities/user";

import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { SyncStorage } from "shared/lib/sync-storage";

import { sessionActions } from "../slice";
import { isSession } from "../types/session-schema";

// NOTE: такое себе, но пока нет сервера для нормальной авторизации, как демо побудет так
export const sessionMiddleware: Middleware = ({ dispatch }: { dispatch: AppDispatch }) => {
  return (next) => async (action) => {
    const storage = new SyncStorage().create("local");

    if (sessionActions.initSessionData.match(action)) {
      const session = storage.get(USER_LOCALSTORAGE_KEY);

      if (isSession(session)) {
        dispatch(sessionActions.setAuthData(session));
        dispatch(fetchUserData(session.userId));
      }
    }

    if (sessionActions.setAuthData.match(action)) {
      const session = storage.get(USER_LOCALSTORAGE_KEY);

      if (isSession(session)) {
        dispatch(fetchUserData(session.userId));
      }
    }

    if (sessionActions.clearSessionData.match(action)) {
      storage.remove(USER_LOCALSTORAGE_KEY);
    }

    next(action);
  };
};
