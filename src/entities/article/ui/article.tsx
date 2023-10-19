import cn from "classnames";
import React, { useEffect } from "react";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";
import { Loader } from "shared/ui/loader/loader";

import EyeIcon from "shared/assets/icons/eye.svg";

import { selectArticleData, selectArticleError, selectArticleIsLoading } from "../model/selectors";
import { fetchArticleData } from "../model/services/fetch-article-data";
import { articleReducer } from "../model/slice/article-slice";
import { type TArticle } from "../model/types/article";

import { ArticleBody } from "./article-body";

import css from "./article.module.scss";

export type ArticleProps = {
  id?: TArticle["id"];
};

const asyncArticleReducer: AsyncReducersList = { article: articleReducer };

export const Article: React.FC<ArticleProps> = ({ id }) => {
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

  const articleHeader = data && (
    <header className={cn(css.header)}>
      <h1 className={css.header__title}>{data.title}</h1>
      <time className={css.header__date}>
        <span className="sr-only">Дата публикации</span>
        {data.createdAt}
      </time>
      <div className={css.header__views}>
        <span className="sr-only">Количество просмотров</span>
        <EyeIcon width={24} height={24} viewBox="0 0 32 32" />
        {data.views}
      </div>
      <div className={css.header__hero}>
        <img src={data.img} className="img_adaptive" alt="" />
      </div>
    </header>
  );

  const articleBody = data && (
    <section className={cn(css.body)}>
      {data.body.map((el) => {
        return ArticleBody(el);
      })}
    </section>
  );

  const articleFooter = data && (
    <footer className={cn(css.footer)}>
      <div className="sr-only">Тэги</div>
      <div className={cn(css.tags)}>
        {data.type.map((t) => (
          <div key={t} className={cn(css.tags__item)}>
            {t}
          </div>
        ))}
      </div>
    </footer>
  );

  return (
    <article>
      {articleHeader}
      {articleBody}
      {articleFooter}
    </article>
  );
};
