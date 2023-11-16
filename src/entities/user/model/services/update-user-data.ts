import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/app-store";

import { Session } from "entities/session/@x";

import { updateUser } from "../../api/user-api";
import { User } from "../types/user-schema";

export const updateUserData = createAsyncThunk<
  User,
  { formData: User; userId: Session["userId"] },
  ThunkConfig<string>
>("user/updateUserData", async ({ formData, userId }, thunkApi) => {
  try {
    const response = await updateUser(formData, userId);

    if (!response) {
      throw new Error("No data");
    }

    return response;
  } catch (error) {
    let errorMessage = "";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return thunkApi.rejectWithValue(errorMessage);
  }
});
