import cn from "classnames";
import React from "react";

import { ArticlesSearch } from "features/articles/search";
import { ArticlesSelectCategory } from "features/articles/select-category";
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
      <div className={css.categories}>
        <ArticlesSelectCategory />
      </div>
      <div className={css.sort}>
        <SortArticles />
      </div>
    </div>
  );
};
