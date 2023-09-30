import { Decorator, StoryFn } from "@storybook/react";

import { ThemeProvider } from "features/theme-switcher";
import { Theme } from "features/theme-switcher/model/theme-context";

export const ThemeDecorator = (theme: Theme): Decorator =>
  function withTheme(StoryComponent: StoryFn) {
    return (
      <ThemeProvider defaultTheme={theme}>
        <StoryComponent />
      </ThemeProvider>
    );
  };
