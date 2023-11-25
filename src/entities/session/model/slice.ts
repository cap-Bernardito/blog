import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { updateUserData, User } from "entities/user/@x";
import { SessionStateSchema } from "./types/session";
import { Session } from "./types/session-schema";

const initialState: SessionStateSchema = {
  isAuthorized: false,
  isLoading: false,
};

export const sessionSlice = createSlice<
  SessionStateSchema,
  {
    setAuth: (state: SessionStateSchema, action: PayloadAction<Session>) => void;
    clearSession: (state: SessionStateSchema) => void;
  },
  "session"
>({
  name: "session",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.isAuthorized = true;
      state.userId = payload.userId;
      state._isInit = true;
    },
    clearSession: (state) => {
      state.userId = undefined;
      state.isAuthorized = false;
    },
  },
  extraReducers: () => {
    // WIP: исчинить updateUserData
    // builder.addCase(updateUserData.fulfilled, (state, action: PayloadAction<User>) => {
    //   state.user = action.payload;
    // });
  },
});

export const { actions: sessionActions } = sessionSlice;
export const { reducer: sessionReducer } = sessionSlice;
