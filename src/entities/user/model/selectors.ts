import type { RootState } from "app/app-store";

export const getAuthData = (state: RootState) => state.user.authData;
