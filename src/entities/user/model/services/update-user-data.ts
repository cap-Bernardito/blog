import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Session } from "entities/session";
import { updateUser } from "entities/user/api/user-api";

import { User } from "../types/user";

export const updateUserData = createAsyncThunk<
  User,
  { formData: User; userId: Session["userId"] },
  ThunkConfig<string>
>("user/updateUserData", async ({ formData, userId }, thunkApi) => {
  try {
    const response = await updateUser(formData, userId);

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (e) {
    console.log(e);
    return thunkApi.rejectWithValue("error");
  }
});
