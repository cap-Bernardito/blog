import { RootState } from "app/app-store";

export const selectArticleId = (state: RootState) => state.article?.data?.id;

export const selectRecommendations = (state: RootState) => state.article?.recommendations;
