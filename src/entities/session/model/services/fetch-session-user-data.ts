import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Session } from "entities/session";
import { getUser, User } from "entities/user/@x";

export const fetchSessionUserData = createAsyncThunk<User, Session["userId"], ThunkConfig<string>>(
  "user/fetchSessionUserData",
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
