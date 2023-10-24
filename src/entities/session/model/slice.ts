import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { updateUserData, User } from "entities/user/@x";

import { fetchSessionUserData } from "./services/fetch-session-user-data";
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
    initSessionData: (state: SessionStateSchema) => void;
    setAuthData: (state: SessionStateSchema, action: PayloadAction<Session>) => void;
    setUser: (state: SessionStateSchema, action: PayloadAction<User>) => void;
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
    setUser: (state, { payload }) => {
      state.isAuthorized = true;
      state.user = payload;
    },
    clearSessionData: (state) => {
      state.accessToken = undefined;
      state.userId = undefined;
      state.isAuthorized = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionUserData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchSessionUserData.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchSessionUserData.rejected, (state, action) => {
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
