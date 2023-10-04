import { RootState } from "app/app-store";

export const getProfileData = (state: RootState) => state.profile?.data;

export const getProfileError = (state: RootState) => state.profile?.error;

export const getProfileIsLoading = (state: RootState) => state.profile?.isLoading;
