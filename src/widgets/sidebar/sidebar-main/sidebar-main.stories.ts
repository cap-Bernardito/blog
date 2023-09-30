import type { Meta, StoryObj } from "@storybook/react";

import { Theme } from "features/theme-switcher/model/theme-context";

import { ThemeDecorator } from "shared/config/storybook/decorators/theme-decorator";

import { SidebarMain as Sidebar } from "./sidebar-main";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "widgets/Sidebar",
  component: Sidebar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Light: Story = {};

export const LightNarrow: Story = {
  args: { isNarrow: true },
};

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const DarkNarrow: Story = {
  args: { isNarrow: true },
  decorators: [ThemeDecorator(Theme.DARK)],
};
