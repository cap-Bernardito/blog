import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { type User, userApi } from "entities/user";

export const fetchAllUsers = createAsyncThunk<User[], void, ThunkConfig<string>>(
  "user/fetchAllUser",
  async (_, thunkApi) => {
    try {
      const response = await userApi.getAllUsers();

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
