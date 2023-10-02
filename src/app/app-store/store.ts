import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";

import { createReducerManager } from "app/app-store/reducer-manager";

import { ReducerManager, StateSchema, staticReducers } from "./root-reducer";

export const makeStore = (preloadedState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    ...staticReducers,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export const appStore = makeStore();

export type AppStoreWithReducerManager = ReturnType<typeof makeStore> & { reducerManager: ReducerManager };
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
