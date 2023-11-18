import cn from "classnames";
import React from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { articlesActions, articlesSelectors, fetchArticlesList } from "entities/articles-list";

import { useDebounce } from "shared/lib/use-debounce";
import { Input } from "shared/ui/input";

import css from "./search.module.scss";

type SearchProps = {
  className?: string;
};

const error = (text: string) => (text.length > 2 || text.length === 0 ? undefined : "Минимум 3 символа");

export const ArticlesSearch: React.FC<SearchProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(articlesSelectors.selectSearch);
  const isLoading = useAppSelector(articlesSelectors.selectIsLoading);

  const debouncedFetchData = useDebounce(() => {
    window.scrollTo(0, 0);
    dispatch(fetchArticlesList({ replace: true }));
  }, 500);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (isLoading) {
      return;
    }
    const searchText = event.target.value;

    dispatch(articlesActions.setSearch(searchText));

    if (error(searchText)) {
      return;
    }

    debouncedFetchData();
  };

  return (
    <div className={cn(css.root, className)}>
      <Input
        value={searchValue}
        className={cn(css.field, { [css.field_loading]: isLoading })}
        label="Найти"
        id="search"
        error={error(searchValue)}
        onChange={handleChange}
      />
    </div>
  );
};
