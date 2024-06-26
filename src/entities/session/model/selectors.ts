import type { RootState } from "app/app-store";

export const isAuth = (state: RootState) => state.session.isAuthorized;

export const selectUserId = (state: RootState) => state.session.userId;

export const selectUserRole = (state: RootState) => state.session.role;

export const isAuthInit = (state: RootState) => state.session._isInit;
