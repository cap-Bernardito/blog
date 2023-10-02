import type { RootState } from "app/app-store";

export const getLoginLoading = (state: RootState) => state?.loginForm?.isLoading;

export const getLoginError = (state: RootState) => state?.loginForm?.error;
