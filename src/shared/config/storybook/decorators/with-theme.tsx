import { type Decorator } from "@storybook/react";

import { ThemeProvider } from "features/theme-switcher";

export const withTheme: Decorator = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme;

  return (
    <ThemeProvider defaultTheme={theme}>
      <StoryFn />
    </ThemeProvider>
  );
};
