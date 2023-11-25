import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { updateUserData, User } from "entities/user/@x";

import { fetchSession } from "./services/fetch-session";
import { SessionStateSchema } from "./types/session";
import { Session } from "./types/session-schema";

const initialState: SessionStateSchema = {
  isAuthorized: false,
  isLoading: false,
  user: null,
};

export const sessionSlice = createSlice<
  SessionStateSchema,
  {
    setAuth: (state: SessionStateSchema, action: PayloadAction<Session>) => void;
    clearSession: (state: SessionStateSchema) => void;
  },
  "session"
>({
  name: "session",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.isAuthorized = true;
      state.userId = payload.userId;
      state._isInit = true;
    },
    clearSession: (state) => {
      state.accessToken = undefined;
      state.userId = undefined;
      state.isAuthorized = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchSession.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateUserData.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      });
  },
});

export const { actions: sessionActions } = sessionSlice;
export const { reducer: sessionReducer } = sessionSlice;
