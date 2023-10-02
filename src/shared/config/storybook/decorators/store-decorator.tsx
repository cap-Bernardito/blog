import { StoryFn } from "@storybook/react";
import { Provider } from "react-redux";

import { appStore, makeStore, RootState } from "app/app-store";

export const StoreDecorator = (state?: RootState) =>
  function withTheme(StoryComponent: StoryFn) {
    const store = state ? makeStore(state) : appStore;

    return (
      <Provider store={store}>
        <StoryComponent />
      </Provider>
    );
  };
