import { useContext } from "react";

import { SyncStorage } from "shared/lib/sync-storage";

import { initialTheme } from "../provider/theme-provider";

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./theme-context";

type UseThemeResult = {
  toggleTheme: () => void;
  theme: Theme;
};

const storage = new SyncStorage().create("local");

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme;

    switch (theme) {
      case Theme.DARK: {
        newTheme = Theme.ORANGE;
        break;
      }
      case Theme.ORANGE: {
        newTheme = Theme.LIGHT;
        break;
      }
      case Theme.LIGHT: {
        newTheme = Theme.DARK;
        break;
      }
      default: {
        newTheme = Theme.LIGHT;
      }
    }

    setTheme?.(newTheme);
    storage.add(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme: theme || initialTheme, toggleTheme };
}
