import createAsyncCallback from "@loki/create-async-callback";
import type { Meta, StoryObj } from "@storybook/react";

import { RootState } from "app/app-store";

import { toSessionUserId } from "entities/session/api/types";
import { Theme } from "entities/theme";

import { getWithStore } from "shared/config/storybook/decorators/with-store";
import { Country, Currency } from "shared/const/common";
import { DelayedComponent } from "shared/lib/tests/delayed-component";

import { ToolsPanel } from "./tools-panel";

const preloadAuthStateWithUser: RootState = {
  session: {
    isAuthorized: true,
    accessToken: "atata",
    userId: toSessionUserId(1),
    _isInit: true,
    isLoading: false,
    user: {
      id: 1,
      first: "Вася",
      lastname: "Василек",
      age: "33",
      currency: Currency.RUB,
      country: Country.Russia,
      city: "Moscow",
      username: "admin",
      avatar: "tigger.jpg",
    },
  },
  user: {
    isLoading: false,
  },
};

const preloadOnlyAuthState: RootState = {
  session: {
    isAuthorized: true,
    accessToken: "atata",
    userId: toSessionUserId(1),
    _isInit: true,
    isLoading: false,
    user: null,
  },
  user: {
    isLoading: false,
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

export const LightWithAuthLoading: Story = {
  decorators: [getWithStore(preloadOnlyAuthState)],
};

export const DarkWithAuthLoading: Story = {
  decorators: [getWithStore(preloadOnlyAuthState)],
};

export const LightWithAuth = () => (
  <DelayedComponent delay={2000} onDone={createAsyncCallback()}>
    <ToolsPanel />
  </DelayedComponent>
);
LightWithAuth.story = {
  decorators: [getWithStore(preloadAuthStateWithUser)],
};

export const DarkWithAuth = () => (
  <DelayedComponent delay={2000} onDone={createAsyncCallback()}>
    <ToolsPanel />
  </DelayedComponent>
);
DarkWithAuth.story = {
  parameters: { theme: Theme.DARK },
  decorators: [getWithStore(preloadAuthStateWithUser)],
};
