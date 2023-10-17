import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Session } from "entities/session";

import { getUser } from "../../api/user-api";
import { User } from "../types/user-schema";

export const fetchUserData = createAsyncThunk<User, Session["userId"], ThunkConfig<string>>(
  "user/fetchUserData",
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
