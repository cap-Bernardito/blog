import { RootState } from "app/app-store";

export const selectIsLoading = (state: RootState) => state.articleComments?.isLoading;

export const selectError = (state: RootState) => state.articleComments?.error;
