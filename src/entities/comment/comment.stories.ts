import type { Meta, StoryObj } from "@storybook/react";

import { Comment } from "./comment";

const meta = {
  title: "entities/Comment",
  component: Comment,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Comment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultLoading: Story = {
  args: {},
};

export const DefaultDarkLoading: Story = {
  args: {},
  parameters: { theme: "dark" },
};

export const Default: Story = {
  args: {
    img: "tigger.jpg",
    title: "Вася Василёк",
    children: `Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.
    JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.
    `,
  },
};

export const DefaultDark: Story = {
  args: {
    img: "tigger.jpg",
    title: "Вася Василёк",
    children: `Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.
    JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.
    `,
  },
  parameters: { theme: "dark" },
};
