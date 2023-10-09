import type { RootState } from "app/app-store";

export const getAuthData = (state: RootState) => state.user.authData;

export const getAuthIsInit = (state: RootState) => state.user._isInit;
