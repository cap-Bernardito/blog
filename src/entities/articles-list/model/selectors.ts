import { RootState } from "app/app-store";

export const selectIsLoading = (state: RootState) => state.articles?.isLoading;

export const selectError = (state: RootState) => state.articles?.error;

export const selectView = (state: RootState) => state.articles?.view;

export const selectPage = (state: RootState) => state.articles?.page ?? 1;

export const selectLimit = (state: RootState) => state.articles?.limit;

export const selectHasMore = (state: RootState) => state.articles?.hasMore;

export const selectIsInit = (state: RootState) => state.articles?._isInit;

export const selectSortOrder = (state: RootState) => state.articles?.sortOrder || "asc";

export const selectSortType = (state: RootState) => state.articles?.sortType || "createdAt";
