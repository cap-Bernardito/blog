import React, { useEffect, useMemo, useState } from "react";

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "../model/theme-context";

export const initialTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

type ThemeProviderProps = {
  defaultTheme?: Theme.DARK | Theme.LIGHT;
};

const themeClasses = (() =>
  Object.values(Theme).reduce((acc: string[], theme) => {
    acc.push(`theme-${theme}`);
    return acc;
  }, []))();

export const ThemeProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = ({
  children,
  defaultTheme = initialTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme],
  );

  useEffect(() => {
    document.body.classList.remove(...themeClasses);
    document.body.classList.add("theme", `theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      <div className={`theme theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
