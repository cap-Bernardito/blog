import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Profile } from "../types/profile";

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  "profile/fetchProfileData",
  async (_, thunkApi) => {
    try {
      const response = await thunkApi.extra.api.get<Profile>("/profile");

      return response;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue("error");
    }
  },
);
