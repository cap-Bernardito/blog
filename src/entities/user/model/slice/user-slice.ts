import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import SyncStorage from "shared/lib/sync-storage/sync-storage";

import { isUser, User, UserSchema } from "../types/user";

const storage = new SyncStorage().create("local");

const initialState: UserSchema = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = storage.get(USER_LOCALSTORAGE_KEY);

      if (isUser(user)) {
        state.authData = user;
      }
    },
    logout: (state) => {
      state.authData = undefined;
      storage.remove(USER_LOCALSTORAGE_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
