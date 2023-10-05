import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { User, userActions } from "entities/user";

import { request } from "shared/api";
import { configEnv } from "shared/config/config-env";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import SyncStorage from "shared/lib/sync-storage/sync-storage";

type LoginByUsernameProps = {
  username: string;
  password: string;
};

const storage = new SyncStorage().create("local");

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  "login/loginByUsername",
  async (authData, thunkAPI) => {
    try {
      const response = await request.post<User, LoginByUsernameProps>(`${configEnv.API_BASEURL}/login`, authData);

      if (!response) {
        throw new Error();
      }

      storage.add(USER_LOCALSTORAGE_KEY, response);
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
