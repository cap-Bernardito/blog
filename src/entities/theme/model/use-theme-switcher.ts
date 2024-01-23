import { useContext } from "react";

import { ThemeSwitcherContext } from "./theme-context";

export function useThemeSwitcher() {
  return useContext(ThemeSwitcherContext);
}
