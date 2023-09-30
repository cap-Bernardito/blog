import { createSlice } from "@reduxjs/toolkit";
import { LoginSchema } from "../types/login-schema";
import { loginByUsername } from "../services/login-by-username";

const initialState: LoginSchema = {
  isLoading: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = initialState.isLoading;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = initialState.isLoading;
        state.error = action.payload;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
