import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { request } from "shared/api";

import { User } from "../types/user";

export const fetchUserData = createAsyncThunk<User, void, ThunkConfig<string>>(
  "user/fetchUserData",
  async (_, thunkApi) => {
    try {
      const response = await request.get<User>("/profile");

      return response;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue("error");
    }
  },
);
