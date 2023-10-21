import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import {
  type Article,
  ArticleBody,
  ArticleFooter,
  ArticleHeader,
  articleReducer,
  articleSelectors,
  fetchArticleData,
} from "entities/article";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";

const asyncArticleReducer: AsyncReducersList = { article: articleReducer };

export const ArticlePage = () => {
  const { id } = useParams<Article["id"]>();

  const dispatch = useAppDispatch();
  const data = useAppSelector(articleSelectors.selectArticleData);
  const error = useAppSelector(articleSelectors.selectArticleError);

  useAsyncReducerLoader(asyncArticleReducer, true);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleData(id));
    }
  }, [dispatch, id]);

  if (error) {
    return <div>{error}</div>;
  }

  const { title, createdAt, views, img, body, type } = data || {};

  return (
    <article>
      <ArticleHeader title={title} createdAt={createdAt} views={views} img={img} />
      <ArticleBody data={body} />
      <ArticleFooter tags={type} />
    </article>
  );
};
