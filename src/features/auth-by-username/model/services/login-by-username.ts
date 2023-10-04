import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { User, userActions } from "entities/user";

import { configEnv } from "shared/config/config-env";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

type LoginByUsernameProps = {
  username: string;
  password: string;
};

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  "login/loginByUsername",
  async (authData, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.post<User, LoginByUsernameProps>(
        `${configEnv.API_BASEURL}/login`,
        authData,
      );

      if (!response) {
        throw new Error();
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response));
      thunkAPI.dispatch(userActions.setAuthData(response));

      return response;
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
