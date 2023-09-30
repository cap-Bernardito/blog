import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "shared/config/storybook/decorators/theme-decorator";
import { Theme } from "features/theme-switcher/model/theme-context";
import { Button, ButtonColor, ButtonVariant } from "./button";
import IconTheme from "shared/assets/icons/theme.svg";

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

export const Secondary: Story = {
  args: {
    children: "Button",
    color: ButtonColor.SECONDARY,
  },
};

export const SecondaryDark: Story = {
  args: {
    children: "Button",
    color: ButtonColor.SECONDARY,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Icon: Story = {
  args: {
    children: <IconTheme width={32} height={32} viewBox="0 0 32 32" />,
    variant: ButtonVariant.ICON,
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
  decorators: [ThemeDecorator(Theme.DARK)],
};
