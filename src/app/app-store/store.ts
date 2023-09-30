import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./root-reducer";

type MakeStore = {
  preloadedState?: Partial<typeof rootReducer>;
};

export const makeStore = ({ preloadedState }: MakeStore = {}) => {
  return configureStore({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState,
  });
};

export const appStore = makeStore();

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
