import cn from "classnames";
import React from "react";

import { OpenLoginModal } from "widgets/login-modal";

import css from "./tools-panel.module.scss";

type ToolsPanelProps = {
  className?: string;
};

export const ToolsPanel: React.FC<ToolsPanelProps> = ({ className }) => {
  return (
    <div className={cn(css.root, className)} role="complementary" aria-label="Панель инструментов">
      <OpenLoginModal />
    </div>
  );
};
