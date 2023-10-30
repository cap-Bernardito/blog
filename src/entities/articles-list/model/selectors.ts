import { RootState } from "app/app-store";

export const selectIsLoading = (state: RootState) => state.articles?.isLoading;

export const selectError = (state: RootState) => state.articles?.error;
