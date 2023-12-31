import type { Meta, StoryObj } from "@storybook/react";

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
  parameters: { theme: "dark" },
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
  parameters: { theme: "dark" },
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
  parameters: { theme: "dark" },
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
  parameters: { theme: "dark" },
};

export const Disabled: Story = {
  args: {
    value: "Arabella",
    label: "Имя",
    disabled: true,
  },
};

export const DisabledDark: Story = {
  args: {
    value: "Arabella",
    label: "Имя",
    disabled: true,
  },
  parameters: { theme: "dark" },
};
