import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { User, userActions } from "entities/user";

import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

type LoginByUsernameProps = {
  username: string;
  password: string;
};

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  "login/loginByUsername",
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post<User>("http://localhost:8000/login", authData);

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (e) {
      // TODO: сделать обработку ошибок, когда API устаканится
      console.log(e);

      let errorMessage = "";

      if (e instanceof Error) {
        errorMessage = e.message;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
