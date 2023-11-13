import cn from "classnames";
import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { articlesActions, ArticlesListStateSchema, articlesSelectors, fetchArticlesList } from "entities/articles-list";

import { Select, SelectOption } from "shared/ui/select";

import css from "./sort-articles.module.scss";

type SortArticlesProps = {
  className?: string;
};

export const SortArticles: React.FC<SortArticlesProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const sortOrder = useAppSelector(articlesSelectors.selectSortOrder);
  const sortType = useAppSelector(articlesSelectors.selectSortType);

  const handleChangeSortOrder = useCallback(
    (value: ArticlesListStateSchema["sortOrder"]) => {
      value && dispatch(articlesActions.setSortOrder(value));
      dispatch(fetchArticlesList({ replace: true }));
    },
    [dispatch],
  );

  const handleChangeSortType = useCallback(
    (value: ArticlesListStateSchema["sortType"]) => {
      value && dispatch(articlesActions.setSortType(value));
      dispatch(fetchArticlesList({ replace: true }));
    },
    [dispatch],
  );

  return (
    <div className={cn(css.root, className)}>
      <h4 className={css.title}>Сортировать по:</h4>
      <div className={css.field}>
        <Select<"select", ArticlesListStateSchema["sortType"]>
          noLabel
          label="Тип сортировки"
          id="sort_type"
          value={sortType}
          changeHandler={handleChangeSortType}
        >
          <SelectOption value="createdAt">Дата загрузки</SelectOption>
          <SelectOption value="views">Количество просмотров</SelectOption>
        </Select>
      </div>
      <div className={css.field}>
        <Select<"select", ArticlesListStateSchema["sortOrder"]>
          noLabel
          label="Порядок сортировки"
          id="sort_order"
          value={sortOrder}
          changeHandler={handleChangeSortOrder}
        >
          <SelectOption value="asc">Возрастанию</SelectOption>
          <SelectOption value="desc">Убыванию</SelectOption>
        </Select>
      </div>
    </div>
  );
};
