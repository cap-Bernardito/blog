import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "entities/user";
import { loginReducer } from "features/auth-by-username/model/slice/login-slice";

export const rootReducer = combineReducers({
  user: userReducer,
  loginForm: loginReducer,
});
