import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchUserData } from "../services/fetch-user-data";
import { updateUserData } from "../services/update-user-data";
import { User, UserStateSchema } from "../types/user";

const initialState: UserStateSchema = {
  readonly: true,
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
      })

      .addCase(updateUserData.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = action.payload;
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
