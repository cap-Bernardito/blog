import { type Decorator } from "@storybook/react";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { ThemeProvider } from "entities/theme";

export const withTheme: Decorator = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme;

  return (
    <ThemeProvider defaultTheme={theme}>
      <StoryFn />
    </ThemeProvider>
  );
};
