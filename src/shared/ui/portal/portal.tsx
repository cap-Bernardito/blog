import React from "react";
import ReactDOM from "react-dom";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { ThemeProvider, useTheme } from "entities/theme";

type PortalProps = {
  root: HTMLDivElement;
};

export const Portal: React.FC<React.PropsWithChildren<PortalProps>> = ({ children, root }) => {
  const theme = useTheme();

  return ReactDOM.createPortal(<ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>, root);
};
