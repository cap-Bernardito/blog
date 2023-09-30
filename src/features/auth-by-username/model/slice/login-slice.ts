import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginSchema } from "../types/login-schema";
import { loginByUsername } from "../services/login-by-username";

const initialState: LoginSchema = {
  isLoading: false,
  username: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<LoginSchema["username"]>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<LoginSchema["password"]>) => {
      state.password = action.payload;
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = initialState.isLoading;
        state.username = initialState.username;
        state.password = initialState.password;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = initialState.isLoading;
        state.error = action.payload;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
