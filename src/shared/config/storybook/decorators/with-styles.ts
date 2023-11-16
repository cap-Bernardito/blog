import { type Decorator } from "@storybook/react";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import "app/styles/index.scss";

export const withStyles: Decorator = (StoryFn) => StoryFn();
