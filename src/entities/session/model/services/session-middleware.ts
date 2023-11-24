import { Middleware } from "@reduxjs/toolkit";

import { AppDispatch } from "app/app-store";

import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { SyncStorage } from "shared/lib/sync-storage";

import { sessionActions } from "../slice";
import { isSession } from "../types/session-schema";

import { fetchSession } from "./fetch-session";

// NOTE: такое себе, но пока нет сервера для нормальной авторизации, как демо побудет так
export const sessionMiddleware: Middleware = ({ dispatch }: { dispatch: AppDispatch }) => {
  return (next) => async (action) => {
    const storage = new SyncStorage().create("local");
    // WIP: исправить
    if (sessionActions.initSession.match(action)) {
      const session = storage.get(USER_LOCALSTORAGE_KEY);

      if (isSession(session)) {
        dispatch(sessionActions.setAuth(session));
      }
    }

    if (sessionActions.setAuth.match(action)) {
      dispatch(fetchSession(action.payload.userId));
    }

    if (sessionActions.clearSession.match(action)) {
      storage.remove(USER_LOCALSTORAGE_KEY);
    }

    next(action);
  };
};
