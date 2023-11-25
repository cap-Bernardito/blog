import { RootState } from "app/app-store";

import { userRTKApi } from "../api/user-api";

export const selectData = (state: RootState) => state.user?.data;

export const selectError = (state: RootState) => state.user?.error;

export const selectIsLoading = (state: RootState) => state.user?.isLoading;

export const selectMe = userRTKApi.endpoints.me.select();
