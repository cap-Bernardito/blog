import type { Meta, StoryObj } from "@storybook/react";

import { Theme } from "entities/theme";

import { UserCard } from "./user-card";

const meta = {
  title: "shared/UserCard",
  component: UserCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DefaultDark: Story = {
  args: {},
  parameters: { theme: Theme.DARK },
};
