import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { getAllUsers } from "../../../../entities/user/api/user-api";
import { User } from "../../../../entities/user/model/types/user-schema";

export const fetchAllUsers = createAsyncThunk<User[], void, ThunkConfig<string>>(
  "user/fetchAllUser",
  async (_, thunkApi) => {
    try {
      const response = await getAllUsers();

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
