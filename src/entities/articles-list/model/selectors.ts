import { RootState } from "app/app-store";

export const selectIsLoading = (state: RootState) => state.articles?.isLoading;

export const selectError = (state: RootState) => state.articles?.error;

export const selectView = (state: RootState) => state.articles?.view;

export const selectPage = (state: RootState) => state.articles?.page;

export const selectLimit = (state: RootState) => state.articles?.limit;

export const selectHasMore = (state: RootState) => state.articles?.hasMore;
