import { Decorator, StoryFn } from "@storybook/react";
import { Theme } from "features/theme-switcher/model/theme-context";

export const ThemeDecorator = (theme: Theme): Decorator =>
  function withTheme(StoryComponent: StoryFn) {
    // Theme.LIGHT установлена в качестве глобального декоратора
    // Когда применяем в компоненте еще раз ThemeDecorator, отступы глобального не нужны
    const styles = {
      minHeight: "auto",
      padding: "20px",
      margin: theme === Theme.LIGHT ? 0 : "-20px",
    };

    return (
      <div className={`app app-${theme}`} style={styles}>
        <StoryComponent />
      </div>
    );
  };
