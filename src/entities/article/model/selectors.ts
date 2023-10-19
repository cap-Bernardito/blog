import { RootState } from "app/app-store";

export const selectArticleData = (state: RootState) => state.article?.data;

export const selectArticleError = (state: RootState) => state.article?.error;

export const selectArticleIsLoading = (state: RootState) => state.article?.isLoading;
