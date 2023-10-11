import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Session, SessionSchema } from "./types";

const initialState: SessionSchema = {
  isAuthorized: false,
};

export const sessionSlice = createSlice<
  SessionSchema,
  {
    initSessionData: (state: SessionSchema) => void;
    setAuthData: (state: SessionSchema, action: PayloadAction<Session>) => void;
    clearSessionData: (state: SessionSchema) => void;
  },
  "session"
>({
  name: "session",
  initialState,
  reducers: {
    initSessionData: (state) => {
      state._isInit = true;
    },
    setAuthData: (state, { payload }) => {
      state.isAuthorized = true;
      state.userId = payload.userId;
      state.accessToken = payload.accessToken;
    },
    clearSessionData: (state) => {
      state.accessToken = undefined;
      state.userId = undefined;
      state.isAuthorized = false;
    },
  },
});

export const { actions: sessionActions } = sessionSlice;
export const { reducer: sessionReducer } = sessionSlice;
