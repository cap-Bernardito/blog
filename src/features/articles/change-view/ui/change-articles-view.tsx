import cn from "classnames";
import React from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { articlesActions, articlesSelectors } from "entities/articles-list";

import { Button } from "shared/ui/button";

import Grid from "shared/assets/icons/grid.svg";
import List from "shared/assets/icons/list.svg";

import css from "./change-articles-view.module.scss";

type ChangeArticlesViewProps = {
  className?: string;
};

export const ChangeArticlesView: React.FC<ChangeArticlesViewProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const articleView = useAppSelector(articlesSelectors.selectView);

  const handleListClick = () => {
    dispatch(articlesActions.setView("list"));
    window.scrollTo(0, 0);
  };

  const handleGridClick = () => {
    dispatch(articlesActions.setView("grid"));
    window.scrollTo(0, 0);
  };

  return (
    <div className={cn(css.root, className)}>
      <Button
        className={cn(css.root__left, { [css.active]: articleView === "list" })}
        onClick={handleListClick}
        aria-label="Показать списком"
      >
        <List />
      </Button>
      <Button
        className={cn(css.root__right, { [css.active]: articleView === "grid" })}
        onClick={handleGridClick}
        aria-label="Показать плиткой"
      >
        <Grid />
      </Button>
    </div>
  );
};
