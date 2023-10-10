import { AsyncThunk, createSlice } from "@reduxjs/toolkit";

import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { SyncStorage } from "shared/lib/sync-storage";

import { isSession, Session, SessionSchema } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<Session, unknown, any>;

type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export const sessionLoginActionName = "session/login-by-username";

const storage = new SyncStorage().create("local");

const initialState: SessionSchema = {
  isAuthorized: false,
};

// TODO: приделать загрузку профиля при успехной авторизации
export const sessionSlice = createSlice<
  SessionSchema,
  {
    initSessionData: (state: SessionSchema) => void;
    clearSessionData: (state: SessionSchema) => void;
  },
  "session"
>({
  name: "session",
  initialState,
  reducers: {
    initSessionData: (state) => {
      const session = storage.get(USER_LOCALSTORAGE_KEY);

      if (isSession(session)) {
        // NOTE: такое себе, но пока нет сервера для нормальной авторизации
        state.isAuthorized = true;
        state.userId = Number(session.userId);
        state.accessToken = session.accessToken;
      }

      state._isInit = true;
    },
    clearSessionData: (state) => {
      storage.remove(USER_LOCALSTORAGE_KEY);

      state.accessToken = undefined;
      state.userId = undefined;
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher<FulfilledAction>(
      (action) => action.type.endsWith(`${sessionLoginActionName}/fulfilled`),
      (state: SessionSchema, { payload }) => {
        storage.add(USER_LOCALSTORAGE_KEY, payload);

        state.isAuthorized = true;
        state.userId = payload.userId;
        state.accessToken = payload.accessToken;
      },
    );
  },
});

export const { actions: sessionActions } = sessionSlice;
export const { reducer: sessionReducer } = sessionSlice;
