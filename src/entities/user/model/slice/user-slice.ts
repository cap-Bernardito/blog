import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchUserData } from "../services/fetch-user-data";
import { UserStateSchema } from "../types/user";
import { User } from "../types/user-schema";

const initialState: UserStateSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
