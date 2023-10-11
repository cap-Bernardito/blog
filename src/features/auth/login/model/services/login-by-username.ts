import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { type Session, sessionLoginActionName } from "entities/session";
// Импорт не из session, чтобы сохранить асинхронным чанк с HTTP клиентом
import { type RequestLoginBody, sessionApi } from "entities/session/api";

export const loginByUsername = createAsyncThunk<Session, RequestLoginBody, ThunkConfig<string>>(
  sessionLoginActionName,
  async (authData, thunkAPI) => {
    try {
      const response = await sessionApi.login(authData);

      if (!response) {
        throw new Error();
      }

      return response;
    } catch (e) {
      // TODO: сделать обработку ошибок, когда API устаканится
      console.log(e);

      let errorMessage = "";

      if (e instanceof Error) {
        errorMessage = e.message;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
