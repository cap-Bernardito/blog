import { RootState } from "app/app-store";

export const selectData = (state: RootState) => state.allUsers?.data;

export const selectError = (state: RootState) => state.allUsers?.error;

export const selectIsLoading = (state: RootState) => state.allUsers?.isLoading;
