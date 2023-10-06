import { StoryFn } from "@storybook/react";
import { Provider } from "react-redux";

import { appStore, type AsyncReducersList, makeStore, type RootState } from "app/app-store";

export const StoreDecorator = (state?: Partial<RootState>, asyncReducers?: AsyncReducersList) =>
  function withTheme(StoryComponent: StoryFn) {
    const store = state ? makeStore({ ...appStore.getState(), ...state }, asyncReducers) : appStore;

    return (
      <Provider store={store}>
        <StoryComponent />
      </Provider>
    );
  };
