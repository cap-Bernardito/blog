import cn from "classnames";
import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { articlesActions, articlesSelectors, fetchArticlesList } from "entities/articles-list";

import { Button, ButtonColor } from "shared/ui/button";
import { Skeleton } from "shared/ui/skeleton";

import css from "./select-category.module.scss";

type SelectCategoryProps = {
  className?: string;
};

type TabProps = {
  category: string;
  isActive?: boolean;
  onClick: (value?: string) => void;
};

const Tab: React.FC<TabProps> = React.memo(({ category, isActive, onClick }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick((e.target as HTMLButtonElement).textContent || undefined);
    },
    [onClick],
  );

  if (isActive) {
    return (
      <Button className={css.button} color={ButtonColor.DARK}>
        {category}
      </Button>
    );
  }

  return (
    <Button className={css.button} variant="tab" onClick={handleClick}>
      {category}
    </Button>
  );
});

Tab.displayName = "Tab";

export const ArticlesSelectCategory: React.FC<SelectCategoryProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(articlesSelectors.selectCategories);
  const activeCategory = useAppSelector(articlesSelectors.selectType);

  const handleClick = useCallback(
    (value?: string) => {
      const result = value === "Все категории" ? undefined : value;

      dispatch(articlesActions.setCategory(result));
      dispatch(fetchArticlesList({ replace: true }));
      window.scrollTo(0, 0);
    },
    [dispatch],
  );

  return (
    <div className={cn(css.root, className)}>
      <Tab category="Все категории" isActive={!activeCategory} onClick={handleClick} />

      {categories.map((category, index) => {
        if (category) {
          const isActive = category === activeCategory;

          return <Tab key={category} category={category} isActive={isActive} onClick={handleClick}></Tab>;
        }

        return <Skeleton key={index} height={30} style={{ marginBottom: "11px" }} />;
      })}
    </div>
  );
};
