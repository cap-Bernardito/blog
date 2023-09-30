import type { RootState } from "app/app-store";

export const getLoginState = (state: RootState) => state?.loginForm;
