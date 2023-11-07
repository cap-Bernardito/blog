import cn from "classnames";
import React from "react";

import { SortArticles } from "features/sort-articles";

import css from "./sidebar-secondary.module.scss";

type SidebarSecondaryProps = {
  className?: string;
};

export const SidebarSecondary: React.FC<SidebarSecondaryProps> = ({ className }) => {
  return (
    <div className={cn(css.root, className)}>
      <SortArticles />
    </div>
  );
};
