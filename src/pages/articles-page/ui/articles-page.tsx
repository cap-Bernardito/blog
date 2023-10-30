import { useEffect } from "react";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import { ArticleCardVertical } from "entities/article";
import {
  articlesAdapterSelectors,
  articlesReducer,
  articlesSelectors,
  fetchArticlesList,
} from "entities/articles-list";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";
import { Loader } from "shared/ui/loader/loader";

const asyncArticlesReducer: AsyncReducersList = { articles: articlesReducer };

export const ArticlesPage = () => {
  const dispatch = useAppDispatch();
  const articlesIsLoading = useAppSelector(articlesSelectors.selectIsLoading);
  const articlesError = useAppSelector(articlesSelectors.selectError);
  const articles = useAppSelector(articlesAdapterSelectors.selectAll);

  useAsyncReducerLoader(asyncArticlesReducer);

  useEffect(() => {
    dispatch(fetchArticlesList());
  }, [dispatch]);

  if (articlesError) {
    return <div>{articlesError}</div>;
  }

  if (articlesIsLoading) {
    return <Loader />;
  }

  return <div>{articles && articles.map((article) => <ArticleCardVertical key={article.id} {...article} />)}</div>;
};
