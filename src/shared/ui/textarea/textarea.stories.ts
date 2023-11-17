import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./textarea";

const meta = {
  title: "shared/Textarea",
  component: Textarea,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    value: "",
    label: "Введите сообщение",
    placeholder: "Введите сообщение",
  },
};

export const Dark: Story = {
  args: {
    value: "",
    label: "Введите сообщение",
    placeholder: "Введите сообщение",
  },
  parameters: { theme: "dark" },
};

export const LightWithValue: Story = {
  args: {
    value: "Сообщение",
    label: "Введите сообщение",
    placeholder: "Введите сообщение",
  },
};

export const DarkWithValue: Story = {
  args: {
    value: "Сообщение",
    label: "Введите сообщение",
    placeholder: "Введите сообщение",
  },
  parameters: { theme: "dark" },
};

export const LightWithLongValue: Story = {
  args: {
    value:
      "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы",
    label: "Введите сообщение",
    placeholder: "Введите сообщение",
  },
};

export const DarkWithLongValue: Story = {
  args: {
    value:
      "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы",
    label: "Введите сообщение",
    placeholder: "Введите сообщение",
  },
  parameters: { theme: "dark" },
};

export const LightWithError: Story = {
  args: {
    value: "",
    error: "Поле не может быть пустым",
    label: "Введите сообщение",
    placeholder: "Введите сообщение",
  },
};

export const DarkWithError: Story = {
  args: {
    value: "",
    error: "Поле не может быть пустым",
    label: "Введите сообщение",
    placeholder: "Введите сообщение",
  },
  parameters: { theme: "dark" },
};
