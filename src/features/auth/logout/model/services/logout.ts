import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { sessionActions, sessionApi } from "entities/session";

export const logout = createAsyncThunk<void, void, ThunkConfig<string>>(
  "session/logout",
  async (_: unknown, { dispatch }) => {
    await dispatch(sessionApi.endpoints.logout.initiate());
    dispatch(sessionActions.clearSession());
  },
);
