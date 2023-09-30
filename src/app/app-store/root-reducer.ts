import { combineReducers } from "@reduxjs/toolkit";

import { loginReducer } from "features/auth-by-username/model/slice/login-slice";

import { userReducer } from "entities/user";

export const rootReducer = combineReducers({
  user: userReducer,
  loginForm: loginReducer,
});
