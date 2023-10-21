import type { Meta, StoryObj } from "@storybook/react";

import { Theme } from "entities/theme";

import { ArticleBody } from "./article-body";

const meta = {
  title: "shared/ArticleBody",
  component: ArticleBody,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArticleBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DefaultDark: Story = {
  args: {},
  parameters: { theme: Theme.DARK },
};
