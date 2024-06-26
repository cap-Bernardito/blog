import type { Meta, StoryObj } from "@storybook/react";

import IconTheme from "../../assets/icons/theme.svg";

import { Button } from "./button";

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
    variant: "clear",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    color: "secondary",
  },
};

export const SecondaryDark: Story = {
  args: {
    children: "Button",
    color: "secondary",
  },
  parameters: { theme: "dark" },
};

export const Success: Story = {
  args: {
    children: "Button",
    color: "success",
  },
};

export const SuccessDark: Story = {
  args: {
    children: "Button",
    color: "success",
  },
  parameters: { theme: "dark" },
};

export const Error: Story = {
  args: {
    children: "Button",
    color: "error",
  },
};

export const ErrorDark: Story = {
  args: {
    children: "Button",
    color: "error",
  },
  parameters: { theme: "dark" },
};

export const Icon: Story = {
  args: {
    children: <IconTheme width={32} height={32} viewBox="0 0 32 32" />,
    variant: "icon",
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
};

export const DisabledDark: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
  parameters: { theme: "dark" },
};
