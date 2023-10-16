import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { type RequestLoginBody, type Session, sessionActions, sessionApi } from "entities/session";

import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { SyncStorage } from "shared/lib/sync-storage";

const storage = new SyncStorage().create("local");

export const loginByUsername = createAsyncThunk<Session, RequestLoginBody, ThunkConfig<string>>(
  "auth/login",
  async (authData, thunkAPI) => {
    try {
      const response = await sessionApi.login(authData);

      if (!response) {
        throw new Error();
      }

      storage.add(USER_LOCALSTORAGE_KEY, response);
      thunkAPI.dispatch(sessionActions.setAuthData(response));

      return response;
    } catch (e) {
      // TODO: сделать обработку ошибок, когда API устаканится
      let errorMessage = "";

      if (e instanceof Error) {
        errorMessage = e.message;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
