import { CombinedState, configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";

import { createReducerManager } from "app/app-store/reducer-manager";

import { sessionMiddleware } from "entities/session/model/services/session-middleware";

import { staticReducers } from "./root-reducer";
import { AsyncReducersList, ReducerManager, StateSchema } from "./types";

export const makeStore = (preloadedState?: StateSchema, asyncReducers?: AsyncReducersList) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    ...staticReducers,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sessionMiddleware),
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
