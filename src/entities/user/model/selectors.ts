import { RootState } from "app/app-store";

export const getUserData = (state: RootState) => state.user?.data;

export const getUserError = (state: RootState) => state.user?.error;

export const getUserIsLoading = (state: RootState) => state.user?.isLoading;
