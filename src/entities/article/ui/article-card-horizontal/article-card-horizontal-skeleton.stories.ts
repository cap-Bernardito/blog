import type { Meta, StoryObj } from "@storybook/react";

import { ArticleCardHorizontalSkeleton } from "./article-card-horizontal";

const meta = {
  title: "entities/ArticleCardHorizontalSkeleton",
  component: ArticleCardHorizontalSkeleton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArticleCardHorizontalSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  parameters: { theme: "dark" },
};
