import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { getUser, User } from "entities/user/@x";

import { Session } from "../types/session-schema";

export const fetchSession = createAsyncThunk<User, Session["userId"], ThunkConfig<string>>(
  "session/fetchSession",
  async (userId, thunkApi) => {
    try {
      const response = await getUser(userId);

      if (!response) {
        throw new Error("No data");
      }

      return response;
    } catch (error) {
      let errorMessage = "";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);
