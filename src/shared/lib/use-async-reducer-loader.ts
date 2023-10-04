import { Reducer } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useStore } from "react-redux";

import { AsyncStateSchemaKey, StateSchemaKey, useAppDispatch } from "app/app-store";
import { AppStoreWithReducerManager } from "app/app-store/store";

export type AsyncReducersList = {
  [name in AsyncStateSchemaKey]?: Reducer;
};

export const useAsyncReducerLoader = (reducers: AsyncReducersList, removeAfterUnmount = false) => {
  const store = useStore() as AppStoreWithReducerManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);
};
