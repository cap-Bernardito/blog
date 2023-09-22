import { Decorator, StoryFn } from "@storybook/react";
import { Theme } from "features/theme-switcher/model/theme-context";

export const ThemeDecorator = (theme: Theme): Decorator =>
  function withTheme(StoryComponent: StoryFn) {
    const styles = {
      minHeight: "auto",
    };

    return (
      <div className={`app app-${theme}`} style={styles}>
        <StoryComponent />
      </div>
    );
  };
