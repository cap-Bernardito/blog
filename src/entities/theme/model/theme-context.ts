import { createContext } from "react";

export type Theme = "light" | "dark" | "orange";

export type ThemeContextProps = Theme;

export type ThemeSwitcherContextProps = (theme: Theme) => void;

export const ThemeContext = createContext<ThemeContextProps>("light");

export const ThemeSwitcherContext = createContext<React.Dispatch<React.SetStateAction<Theme>>>(() => {});

export const LOCAL_STORAGE_THEME_KEY = "theme";
