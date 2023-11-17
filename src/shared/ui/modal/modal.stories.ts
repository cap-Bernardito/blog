import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./ui/modal";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "shared/Modal",
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const mockText = `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Это дороге
переписывается то предупреждал свое власти свой снова всемогущая.`;

export const Light: Story = {
  args: {
    children: mockText,
  },
};

export const LightWithTitle: Story = {
  args: {
    children: mockText,
    title: "Modal component",
  },
};

export const Dark: Story = {
  args: {
    children: mockText,
  },
  parameters: { theme: "dark" },
};

export const DarkWithTitle: Story = {
  args: {
    children: mockText,
    title: "Modal component",
  },
  parameters: { theme: "dark" },
};
