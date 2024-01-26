import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { type Session, sessionActions, sessionApi, sessionSelectors } from "entities/session";
import { userRTKApi } from "entities/user/@x";

import { getApiErrorMessage } from "shared/api/get-api-error-message";

export const loginByToken = createAsyncThunk<Session, void, ThunkConfig<string>>("auth/token", async (_, thunkAPI) => {
  const isAuthInit = sessionSelectors.isAuthInit(thunkAPI.getState());

  if (isAuthInit) {
    throw new Error("Auth is Initial");
  }

  try {
    const response = await thunkAPI.dispatch(sessionApi.endpoints.auth.initiate()).unwrap();

    await thunkAPI.dispatch(userRTKApi.endpoints.me.initiate()).unwrap();

    if (!response) {
      throw new Error("No data");
    }

    thunkAPI.dispatch(sessionActions.setAuth(response));

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(error));
  }
});
