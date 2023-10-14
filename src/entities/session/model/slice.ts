import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SessionStateSchema } from "./types/session";
import { Session } from "./types/session-schema";

const initialState: SessionStateSchema = {
  isAuthorized: false,
};

export const sessionSlice = createSlice<
  SessionStateSchema,
  {
    initSessionData: (state: SessionStateSchema) => void;
    setAuthData: (state: SessionStateSchema, action: PayloadAction<Session>) => void;
    clearSessionData: (state: SessionStateSchema) => void;
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
