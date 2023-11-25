import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { type Session, sessionActions, sessionApi, sessionSelectors } from "entities/session";

import { isFetchBaseQueryError } from "shared/api/is-fetch-base-query-error";

export const loginByToken = createAsyncThunk<Session, void, ThunkConfig<string>>("auth/token", async (_, thunkAPI) => {
  const isAuthInit = sessionSelectors.isAuthInit(thunkAPI.getState());

  if (isAuthInit) {
    throw new Error("Auth is Initial");
  }

  try {
    const response = await thunkAPI.dispatch(sessionApi.endpoints.auth.initiate()).unwrap();

    if (!response) {
      throw new Error("No data");
    }

    thunkAPI.dispatch(sessionActions.setAuth(response));

    return response;
  } catch (error) {
    // TODO: сделать обработку ошибок, когда API устаканится
    let errorMessage = "";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (isFetchBaseQueryError(error)) {
      // TODO: после перехода на RTK убрать поле "message"
      if (error.data && typeof error.data === "object" && "message" in error.data) {
        errorMessage = error.data.message as string;
      }
    }

    return thunkAPI.rejectWithValue(errorMessage);
  }
});
