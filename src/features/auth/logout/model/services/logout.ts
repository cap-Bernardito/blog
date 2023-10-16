import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { sessionActions } from "entities/session";
import { userActions } from "entities/user";

export const logout = createAsyncThunk<void, void, ThunkConfig<string>>(
  "session/logout",
  async (_: unknown, { dispatch }) => {
    dispatch(sessionActions.clearSessionData());
    dispatch(userActions.clearUserData());
  },
);
