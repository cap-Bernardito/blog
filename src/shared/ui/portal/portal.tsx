import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider, useTheme } from "features/theme-switcher";

type PortalProps = {
  root: HTMLDivElement;
};

export const Portal: React.FC<React.PropsWithChildren<PortalProps>> = ({ children, root }) => {
  const { theme } = useTheme();

  return ReactDOM.createPortal(<ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>, root);
};
