import type { Meta, StoryObj } from "@storybook/react";

import { ArticleCardVerticalSkeleton } from "./article-card-vertical";

const meta = {
  title: "entities/ArticleCardVerticalSkeleton",
  component: ArticleCardVerticalSkeleton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArticleCardVerticalSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  parameters: { theme: "dark" },
};
