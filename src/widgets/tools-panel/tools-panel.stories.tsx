import createAsyncCallback from "@loki/create-async-callback";
import type { Meta, StoryObj } from "@storybook/react";

import { RootState } from "app/app-store";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { OpenLoginModal } from "widgets/login-modal";

import { toSessionUserId } from "entities/session";

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
  scrollPosition: {
    scroll: {},
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
  scrollPosition: {
    scroll: {},
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

export const Light: Story = {
  args: {
    children: <OpenLoginModal />,
  },
};

export const Dark: Story = {
  args: {
    children: <OpenLoginModal />,
  },
  parameters: { theme: "dark" },
};

export const LightWithAuthLoading: Story = {
  args: {
    children: <OpenLoginModal />,
  },
  decorators: [getWithStore(preloadOnlyAuthState)],
};

export const DarkWithAuthLoading: Story = {
  args: {
    children: <OpenLoginModal />,
  },
  decorators: [getWithStore(preloadOnlyAuthState)],
};

export const LightWithAuth = () => (
  <DelayedComponent delay={2000} onDone={createAsyncCallback()}>
    <ToolsPanel>
      <OpenLoginModal />
    </ToolsPanel>
  </DelayedComponent>
);
LightWithAuth.story = {
  args: {
    children: <OpenLoginModal />,
  },
  decorators: [getWithStore(preloadAuthStateWithUser)],
};

export const DarkWithAuth = () => (
  <DelayedComponent delay={2000} onDone={createAsyncCallback()}>
    <ToolsPanel>
      <OpenLoginModal />
    </ToolsPanel>
  </DelayedComponent>
);
DarkWithAuth.story = {
  args: {
    children: <OpenLoginModal />,
  },
  parameters: { theme: "dark" },
  decorators: [getWithStore(preloadAuthStateWithUser)],
};
