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
    let newTheme: Theme;

    switch (theme) {
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

    setTheme?.(newTheme);
    storage.add(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme: theme || initialTheme, toggleTheme };
}
