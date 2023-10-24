import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "entities/user/@x";

import { fetchAllUsers } from "../services/fetch-all-users";
import { AllUsersStateSchema } from "../types/all-users";

const initialState: AllUsersStateSchema = {
  isLoading: false,
  data: [],
};

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: allUsersActions } = allUsersSlice;
export const { reducer: allUsersReducer } = allUsersSlice;
