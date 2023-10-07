import createAsyncCallback from "@loki/create-async-callback";
import type { Meta, StoryObj } from "@storybook/react";

import { AsyncReducersList } from "app/app-store";

import { Theme } from "features/theme-switcher/model/theme-context";

import { profileReducer } from "entities/profile";

import { StoreDecorator } from "shared/config/storybook/decorators/store-decorator";
import { ThemeDecorator } from "shared/config/storybook/decorators/theme-decorator";
import { Country, Currency } from "shared/const/common";
import { DelayedComponent } from "shared/lib/tests/delayed-component";

import { ToolsPanel } from "./tools-panel";

const asyncProfileReducer: AsyncReducersList = { profile: profileReducer };
const preloadAuthState = {
  user: {
    authData: {
      id: "1",
      username: "Вася",
    },
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
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const LightWithAuth = () => (
  <DelayedComponent delay={2000} onDone={createAsyncCallback()}>
    <ToolsPanel />
  </DelayedComponent>
);
LightWithAuth.story = {
  decorators: [StoreDecorator(preloadAuthState, asyncProfileReducer)],
};

export const DarkWithAuth = () => (
  <DelayedComponent delay={2000} onDone={createAsyncCallback()}>
    <ToolsPanel />
  </DelayedComponent>
);
DarkWithAuth.story = {
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator(preloadAuthState, asyncProfileReducer)],
};
