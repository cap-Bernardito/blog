import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { request } from "shared/api";

import { Profile } from "../types/profile";

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  "profile/fetchProfileData",
  async (_, thunkApi) => {
    try {
      const response = await request.get<Profile>("/profile");

      return response;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue("error");
    }
  },
);
