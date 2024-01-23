import React, { useCallback, useEffect, useState } from "react";

import { SyncStorage } from "shared/lib/sync-storage";

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext, ThemeSwitcherContext } from "../model/theme-context";

const storage = new SyncStorage().create("local");

export const initialTheme = (storage.get(LOCAL_STORAGE_THEME_KEY) as Theme) || "light";

type ThemeProviderProps = {
  defaultTheme?: Theme;
};

const themeVariants: Theme[] = ["dark", "light", "orange"];

const themeClasses = (() =>
  themeVariants.reduce((acc: string[], theme) => {
    acc.push(`theme-${theme}`);
    return acc;
  }, []))();

export const ThemeProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = ({
  children,
  defaultTheme = initialTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const switchTheme = useCallback(() => {
    setTheme((currentTheme: Theme) => {
      let newTheme: Theme;

      switch (currentTheme) {
        case "dark": {
          newTheme = "orange";
          break;
        }
        case "orange": {
          newTheme = "light";
          break;
        }
        case "light": {
          newTheme = "dark";
          break;
        }
        default: {
          newTheme = "light";
        }
      }

      storage.add(LOCAL_STORAGE_THEME_KEY, newTheme);

      return newTheme;
    });
  }, []);

  useEffect(() => {
    document.body.classList.remove(...themeClasses);
    document.body.classList.add("theme", `theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeSwitcherContext.Provider value={switchTheme}>
        <div className={`theme theme-${theme}`}>{children}</div>
      </ThemeSwitcherContext.Provider>
    </ThemeContext.Provider>
  );
};
