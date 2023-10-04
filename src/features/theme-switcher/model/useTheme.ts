import { useContext } from "react";

import { initialTheme } from "../ui/theme-provider";

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./theme-context";

type UseThemeResult = {
  toggleTheme: () => void;
  theme: Theme;
};

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme: theme || initialTheme, toggleTheme };
}
