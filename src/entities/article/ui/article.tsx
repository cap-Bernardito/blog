import cn from "classnames";
import React, { useEffect } from "react";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";
import { Loader } from "shared/ui/loader/loader";

import { selectArticleData, selectArticleError, selectArticleIsLoading } from "../model/selectors";
import { fetchArticleData } from "../model/services/fetch-article-data";
import { articleReducer } from "../model/slice/article-slice";
import { type TArticle } from "../model/types/article";

import { ArticleBody } from "./article-body";

import css from "./article.module.scss";

export type ArticleProps = {
  className?: string;
  id?: TArticle["id"];
};

const asyncArticleReducer: AsyncReducersList = { article: articleReducer };

export const Article: React.FC<ArticleProps> = ({ className, id }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectArticleIsLoading);
  const data = useAppSelector(selectArticleData);
  const error = useAppSelector(selectArticleError);

  useAsyncReducerLoader(asyncArticleReducer, true);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleData(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={cn(css.root, className)}>
      {data &&
        data.body.map((el) => {
          return ArticleBody(el);
        })}
    </div>
  );
};
