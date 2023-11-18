import cn from "classnames";
import React from "react";

import css from "./tools-panel.module.scss";

type ToolsPanelProps = {
  className?: string;
};

export const ToolsPanel: React.FC<React.PropsWithChildren<ToolsPanelProps>> = ({ className, children }) => {
  return (
    <div className={cn(css.root, className)} role="complementary" aria-label="Панель инструментов">
      {children}
    </div>
  );
};
