import cn from "classnames";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { routePaths } from "app/app-router/app-router-config";
import { useAppDispatch } from "app/app-store";

import { Article } from "entities/article";
import { articlesActions, fetchArticlesList } from "entities/articles-list";

import { Button, ButtonColor } from "shared/ui/button";
import { Skeleton } from "shared/ui/skeleton";

import css from "./go-to-category.module.scss";

type GoToCategoryProps = {
  className?: string;
  categories?: Article["type"];
};

export const GoToCategory: React.FC<GoToCategoryProps> = ({ className, categories }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      const value = (event.target as HTMLButtonElement).textContent;

      if (value) {
        dispatch(articlesActions.setCategory(value));
        dispatch(fetchArticlesList({ replace: true }));
        navigate(routePaths.articles);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 10);
      }
    },
    [dispatch, navigate],
  );

  return (
    <div className={cn(css.root, className)}>
      {categories ? (
        categories.map((t) => (
          <Button key={t} className={css.button} color={ButtonColor.DARK} onClick={handleClick}>
            {t}
          </Button>
        ))
      ) : (
        <Skeleton count={1} height={30} />
      )}
    </div>
  );
};
