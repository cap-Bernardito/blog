import type { Meta, StoryObj } from "@storybook/react";

import { Theme } from "features/theme-switcher/model/theme-context";

import { ThemeDecorator } from "shared/config/storybook/decorators/theme-decorator";

import { Input } from "./input";

const meta = {
  title: "shared/Input",
  component: Input,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    label: "Имя",
  },
};

export const DefaultDark: Story = {
  args: {
    value: "",
    label: "Имя",
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithValue: Story = {
  args: {
    value: "Arabella",
    label: "Имя",
  },
};

export const WithValueDark: Story = {
  args: {
    value: "Arabella",
    label: "Имя",
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithError: Story = {
  args: {
    value: "",
    error: "Поле не может быть пустым",
    label: "Имя",
  },
};

export const WithErrorDark: Story = {
  args: {
    value: "",
    error: "Поле не может быть пустым",
    label: "Имя",
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithErrorValue: Story = {
  args: {
    value: "Arabella",
    label: "Имя",
    error: "Неверный формат имени",
  },
};

export const WithErrorValueDark: Story = {
  args: {
    value: "Arabella",
    label: "Имя",
    error: "Неверный формат имени",
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
