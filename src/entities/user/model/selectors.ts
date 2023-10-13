import { RootState } from "app/app-store";

export const selectUserData = (state: RootState) => state.user?.data;

export const selectUserError = (state: RootState) => state.user?.error;

export const selectUserIsLoading = (state: RootState) => state.user?.isLoading;
