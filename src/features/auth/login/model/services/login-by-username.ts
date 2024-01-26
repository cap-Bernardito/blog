import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { type RequestLoginBody, type Session, sessionActions, sessionApi } from "entities/session";
import { userRTKApi } from "entities/user/@x";

import { getApiErrorMessage } from "shared/api/get-api-error-message";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { SyncStorage } from "shared/lib/sync-storage";

const storage = new SyncStorage().create("local");

export const loginByUsername = createAsyncThunk<Session, RequestLoginBody, ThunkConfig<string>>(
  "auth/login",
  async (authData, thunkAPI) => {
    try {
      const response = await thunkAPI.dispatch(sessionApi.endpoints.login.initiate(authData)).unwrap();

      await thunkAPI.dispatch(userRTKApi.endpoints.me.initiate()).unwrap();

      if (!response) {
        throw new Error("No data");
      }

      storage.add(USER_LOCALSTORAGE_KEY, response);
      thunkAPI.dispatch(sessionActions.setAuth(response));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(getApiErrorMessage(error));
    }
  },
);
