import { DeepPartial } from "@reduxjs/toolkit";
import { StoryFn } from "@storybook/react";
import { Provider } from "react-redux";

import { appStore, makeStore, RootState } from "app/app-store";

export const StoreDecorator = (state?: DeepPartial<RootState>) =>
  function withTheme(StoryComponent: StoryFn) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const store = state ? makeStore(state) : appStore;

    return (
      <Provider store={store}>
        <StoryComponent />
      </Provider>
    );
  };
