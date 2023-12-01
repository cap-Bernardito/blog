import { createListenerMiddleware, type TypedStartListening } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "app/app-store";

import { invalidateAccessToken } from "shared/api/invalidate-token-event";

import { logout } from "../../logout/model/services/logout";

export const invalidateAccessTokenListener = createListenerMiddleware();

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type TypedListening = TypedStartListening<RootState, AppDispatch>;

export const startInvalidateAccessTokenListener = invalidateAccessTokenListener.startListening as TypedListening;

startInvalidateAccessTokenListener({
  actionCreator: invalidateAccessToken,
  effect: async (_, api) => {
    api.dispatch(logout());
  },
});
