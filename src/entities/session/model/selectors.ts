import type { RootState } from "app/app-store";

export const isAuth = (state: RootState) => state.session.isAuthorized;

export const isAuthInit = (state: RootState) => state.session._isInit;
