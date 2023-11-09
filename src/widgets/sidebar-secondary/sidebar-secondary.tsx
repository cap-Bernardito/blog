import cn from "classnames";
import React from "react";

import { ArticlesSearch } from "features/articles/search/ui/search";
import { SortArticles } from "features/articles/sort";

import css from "./sidebar-secondary.module.scss";

type SidebarSecondaryProps = {
  className?: string;
};

export const SidebarSecondary: React.FC<SidebarSecondaryProps> = ({ className }) => {
  return (
    <div className={cn(css.root, className)}>
      <div className={css.search}>
        <ArticlesSearch />
      </div>
      <SortArticles />
    </div>
  );
};
