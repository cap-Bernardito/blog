import { type Decorator, StoryFn } from "@storybook/react";
import { Provider } from "react-redux";

import { appStore, type AsyncReducersList, makeStore, type RootState } from "app/app-store";

export const getWithStore = (state?: Partial<RootState>, asyncReducers?: AsyncReducersList): Decorator =>
  function withStore(StoryComponent: StoryFn) {
    const store = state ? makeStore({ ...appStore.getState(), ...state }, asyncReducers) : appStore;

    return (
      <Provider store={store}>
        <StoryComponent />
      </Provider>
    );
  };
