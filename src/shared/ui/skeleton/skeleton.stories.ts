import type { Meta, StoryObj } from "@storybook/react";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skeleton } from "./skeleton";

const meta = {
  title: "shared/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 3,
    height: 30,
  },
};

export const DefaultDark: Story = {
  args: {
    count: 3,
    height: 30,
  },
  parameters: { theme: "dark" },
};
