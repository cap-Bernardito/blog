/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from "@storybook/react";

import { Theme } from "entities/theme";

import { Select, SelectOption } from "./select";

const meta = {
  title: "shared/Select",
  component: Select,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "Россия",
    label: "Страна",
    children: [<SelectOption key="Россия">Россия</SelectOption>, <SelectOption key="Беларусь">Беларусь</SelectOption>],
  },
};

export const DefaultDark: Story = {
  args: {
    value: "Россия",
    label: "Страна",
    children: [<SelectOption key="Россия">Россия</SelectOption>, <SelectOption key="Беларусь">Беларусь</SelectOption>],
  },
  parameters: { theme: Theme.DARK },
};
