import type { Meta, StoryObj } from "@storybook/react";

import { ArticleCardHorizontal } from "./article-card-horizontal";

const meta = {
  title: "entities/ArticleCardHorizontal",
  component: ArticleCardHorizontal,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArticleCardHorizontal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    id: "1",
    img: "js.jpg",
    title: "Что такое объектно-ориентированное программирование?",
    excerpt:
      'ООП позволяет разрабатывать сложные системы, которые могут быть легко поняты, поддержаны и модифицированы. ООП - это методология программирования, которая строится на концепции "объектов". Объекты представляют собой экземпляры классов, которые ...',
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
    title: "Что такое объектно-ориентированное программирование?",
    excerpt:
      'ООП позволяет разрабатывать сложные системы, которые могут быть легко поняты, поддержаны и модифицированы. ООП - это методология программирования, которая строится на концепции "объектов". Объекты представляют собой экземпляры классов, которые ...',
    createdAt: "27 апр 2017",
    views: 1230,
    author: {
      avatar: "tigger.jpg",
      username: "admin",
    },
  },
  parameters: { theme: "dark" },
};
