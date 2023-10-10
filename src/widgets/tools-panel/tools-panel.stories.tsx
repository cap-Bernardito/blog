import createAsyncCallback from "@loki/create-async-callback";
import type { Meta, StoryObj } from "@storybook/react";

import { AsyncReducersList, RootState } from "app/app-store";

import { profileReducer } from "entities/profile";
import { Theme } from "entities/theme";

import { getWithStore } from "shared/config/storybook/decorators/with-store";
import { Country, Currency } from "shared/const/common";
import { DelayedComponent } from "shared/lib/tests/delayed-component";

import { ToolsPanel } from "./tools-panel";

const asyncProfileReducer: AsyncReducersList = { profile: profileReducer };
const preloadAuthState: RootState = {
  session: {
    isAuthorized: true,
    accessToken: "atata",
    userId: 1,
    _isInit: true,
  },
  profile: {
    isLoading: false,
    readonly: false,
    data: {
      first: "Вася",
      lastname: "Василек",
      age: 33,
      currency: Currency.RUB,
      country: Country.Russia,
      city: "Moscow",
      username: "admin",
      avatar: "https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg",
    },
  },
};

const meta = {
  title: "widgets/ToolsPanel",
  component: ToolsPanel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToolsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
  parameters: { theme: Theme.DARK },
};

export const LightWithAuth = () => (
  <DelayedComponent delay={2000} onDone={createAsyncCallback()}>
    <ToolsPanel />
  </DelayedComponent>
);
LightWithAuth.story = {
  decorators: [getWithStore(preloadAuthState, asyncProfileReducer)],
};

export const DarkWithAuth = () => (
  <DelayedComponent delay={2000} onDone={createAsyncCallback()}>
    <ToolsPanel />
  </DelayedComponent>
);
DarkWithAuth.story = {
  parameters: { theme: Theme.DARK },
  decorators: [getWithStore(preloadAuthState, asyncProfileReducer)],
};
