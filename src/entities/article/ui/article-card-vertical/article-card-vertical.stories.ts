import type { Meta, StoryObj } from "@storybook/react";

import { ArticleCardVertical } from "./article-card-vertical";

const meta = {
  title: "entities/ArticleCardVertical",
  component: ArticleCardVertical,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArticleCardVertical>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    id: "1",
    img: "js.jpg",
    title:
      "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
    createdAt: "27 апр 2017",
    views: 1230,
    author: {
      avatar: "tigger.jpg",
      username: "admin",
    },
  },
};

export const Dark: Story = {
  args: {
    id: "1",
    img: "js.jpg",
    title:
      "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
    createdAt: "27 апр 2017",
    views: 1230,
    author: {
      avatar: "tigger.jpg",
      username: "admin",
    },
  },
  parameters: { theme: "dark" },
};
