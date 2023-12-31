import { useEffect } from "react";
import { useStore } from "react-redux";

import { AsyncReducersList, StateSchemaKey, useAppDispatch } from "app/app-store";
import { AppStoreWithReducerManager } from "app/app-store";

export const useAsyncReducerLoader = (reducers: AsyncReducersList, removeAfterUnmount = false) => {
  const store = useStore() as AppStoreWithReducerManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      if (name in store.reducerManager.getReducerMap()) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
