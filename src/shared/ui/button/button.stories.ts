import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "shared/config/storybook/decorators/theme-decorator";
import { Theme } from "features/theme-switcher/model/theme-context";
import { Button, ButtonVariant } from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "shared/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Clear: Story = {
  args: {
    children: "Button",
    variant: ButtonVariant.CLEAR,
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: ButtonVariant.OUTLINE,
  },
};

export const OutlineDark: Story = {
  args: {
    children: "Button",
    variant: ButtonVariant.OUTLINE,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Icon: Story = {
  args: {
    children: "BUTTON",
    variant: ButtonVariant.ICON,
  },
};
