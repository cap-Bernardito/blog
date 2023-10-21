import type { Meta, StoryObj } from "@storybook/react";

import { Theme } from "entities/theme";

import { ArticleFooter } from "./article-footer";

const meta = {
  title: "shared/ArticleFooter",
  component: ArticleFooter,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArticleFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DefaultDark: Story = {
  args: {},
  parameters: { theme: Theme.DARK },
};
